import { StyleSheet } from "react-native";

export const miniCharacterCardStyles = StyleSheet.create({
  // Manteremos os estilos do card simples, que agora será o padrão
  cardShadow: {
    borderRadius: 18,
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: 8,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 4,
    borderWidth: 4,
    borderColor: "#fff",
    backgroundColor: "transparent",
  },
  cardContainer: {
    borderRadius: 14,
    overflow: "hidden",
    justifyContent: "flex-end", // Alinha o nome na parte inferior
    alignItems: "center",
    position: "relative",
    backgroundColor: "#111", // Cor de fundo caso a imagem demore a carregar
  },
  cardImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover", // Cover oferece o melhor enquadramento
  },
  nameBottomContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.68)",
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  nameBottomText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "#000",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
    textTransform: "uppercase",
  },

  // --- NOVOS ESTILOS PARA O OVERLAY DE ATRIBUTO DESTACADO ---
  highlightOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  highlightAttributeName: {
    color: "#facc15", // Amarelo
    fontSize: 20,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  highlightAttributeValue: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "900",
    textShadowColor: "#facc15",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});
