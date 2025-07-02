import { StyleSheet } from "react-native";

const MAX_GRID_WIDTH = 900;
const MINI_CARD_WIDTH = 110;
const MINI_CARD_HEIGHT = 145;

export const deckScreenStyles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    alignItems: "center",
    minHeight: "100%",
  },

  title: {
    color: "black",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    letterSpacing: 1,
  },

  titleEscuro: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    letterSpacing: 1,
  },
  groupSection: {
    width: "100%",
    maxWidth: MAX_GRID_WIDTH,
    alignSelf: "center",
    marginBottom: 32,
  },
  groupTitle: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  groupTitleEscuro: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginLeft: 8,
    letterSpacing: 0.5,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    width: "100%",
  },
  cardWrapper: {
    width: MINI_CARD_WIDTH,
    height: MINI_CARD_HEIGHT,
    margin: 6,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBg: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  characterCardContainer: {
    flex: 1,
    backgroundColor: "#0a1a2e",
  },
  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 1000,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    padding: 10,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  characterCardWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
});
