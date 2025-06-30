import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1e293b',
    borderRadius: 15,
    padding: 25,
    width: '85%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  attributeTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#facc15',
    textTransform: 'capitalize',
    marginBottom: 20,
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  playerText: {
    fontSize: 18,
    color: '#cbd5e1',
  },
  vsText: {
    fontSize: 16,
    color: '#f87171',
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});