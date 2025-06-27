import React, { useEffect, useRef, ReactNode } from 'react';
import { Animated, ViewStyle } from 'react-native';

interface FloatingAnimationProps { // Define os props para o componente FloatingAnimation 
  children: ReactNode;
  duration?: number;
  distance?: number;
  rotationAmount?: number;
}

const FloatingAnimation: React.FC<FloatingAnimationProps> = ({  
  children, 
  duration = 4000,
  distance = 20,
  rotationAmount = 2 
}) => {
  const translateY = useRef(new Animated.Value(0)).current;
  const rotateZ = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animação de flutuação vertical (movimento de subida e descida)
    const floatingAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -distance,
          duration: duration / 1,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: distance,
          duration: duration,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: duration / 1.5,
          useNativeDriver: true,
        }),
      ])
    );

    // Animação de balanço suave (rotação leve)
    const swayAnimation = Animated.loop( // Balança suave para os lados
      Animated.sequence([
        Animated.timing(rotateZ, {
          toValue: 1,
          duration: duration * 0.5,
          useNativeDriver: true,
        }),
        Animated.timing(rotateZ, { // Balança para o outro lado
          toValue: -1,
          duration: duration * 1.1,
          useNativeDriver: true,
        }),
        Animated.timing(rotateZ, { // Retorna ao centro
          toValue: 0,
          duration: duration * 0.8,
          useNativeDriver: true,
        }),
      ])
    );

    // Inicia ambas as animações
    Animated.parallel([floatingAnimation, swayAnimation]).start();

    // Cleanup
    return () => {
      floatingAnimation.stop(); // Para parar a animação de flutuação
      swayAnimation.stop(); // Para parar a animação de balanço
    };
  }, [translateY, rotateZ, duration, distance, rotationAmount]);

  const animatedStyle: Animated.WithAnimatedObject<ViewStyle> = {
    transform: [
      {
        translateY: translateY,// Animação de flutuação vertical
      },
      {
        rotate: rotateZ.interpolate({ // Animação de balanço suave
          inputRange: [-1, 1],
          outputRange: [`-${rotationAmount}deg`, `${rotationAmount}deg`],
        }),
      },
    ],
  };

  return (
    <Animated.View style={animatedStyle}> 
      {children}
    </Animated.View>
  );
};

export default FloatingAnimation;