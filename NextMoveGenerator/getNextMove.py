import chess
import chess.engine

STOCKFISH_PATH = "/usr/games/stockfish"

INPUT_FILE = "positions.fen"
OUTPUT_FILE = "resultats.txt"

def main():
    with chess.engine.SimpleEngine.popen_uci(STOCKFISH_PATH) as engine, \
            open(INPUT_FILE, "r", encoding="utf-8") as fin, \
            open(OUTPUT_FILE, "w", encoding="utf-8") as fout:

        for line in fin:
            fen = line.strip()
            if not fen:
                continue

            try:
                board = chess.Board(fen)
                result = engine.analyse(
                    board,
                    chess.engine.Limit(time=0.1)
                )
                move = result["pv"][0]
                fout.write(f"{fen} {move.uci()}\n")

            except Exception:
                fout.write(f"{fen} -> ERROR\n")

    print("✅ Terminé : résultats écrits dans", OUTPUT_FILE)

if __name__ == "__main__":
    main()
