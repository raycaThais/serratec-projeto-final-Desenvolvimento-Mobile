import { StyleSheet } from "react-native";

const CARD_WIDTH = 180;
const CARD_HEIGHT = 250;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#48CAE4",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#48CAE4",
  },
  scoreContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 50,
    paddingBottom: 20,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  battlefield: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  playerSide: {
    alignItems: "center",
  },
  playerName: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  },
  statusContainer: {
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
    minHeight: 80, // Garante espaço para o texto de status
  },
  statusText: {
    color: "#ffc107",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  // ✅ Movido do index.tsx
  confirmButton: {
    backgroundColor: "#facc15",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 15,
    alignSelf: "center",
    elevation: 5,
  },
  confirmButtonText: {
    color: "#1e3a8a",
    fontSize: 16,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#48CAE4",
  },
});
