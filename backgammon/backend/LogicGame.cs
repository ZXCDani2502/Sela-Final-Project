using System.Text.Json;
namespace Testing_Backgammon
{
    public class LogicGame
    {
        string[] Board = new string[24];
        char CurrentPlayer;
        List<int> BLocations = new List<int> { 0, 18, 16, 11 };
        List<int> WLocations = new List<int> { 23, 5, 7, 12 };
        readonly Random Rnd = new Random();
        public List<int> Dices = new List<int>();
        int DiceOne, DiceTwo;
        const char Black = 'b', White = 'w';

        public int EatenWhite = 0, EatenBlack = 0;
        public void InitializeBoard()
        {
            for (int i = 0; i < Board.Length; i++)
            {
                Board[i] = "0";
            }
            Board[23] = "2w";
            Board[0] = "2b";
            Board[5] = "5w";
            Board[18] = "5b";
            Board[7] = "3w";
            Board[16] = "3b";
            Board[12] = "5w";
            Board[11] = "5b";
            DiceRolls();
            Console.WriteLine($"The Current player {(CurrentPlayer == White ? "White" : "Black")}");
        }
        public bool AddPiece(int pos)
        {
            if (IsAvaliablePosition(pos))
            {
                string boardPos = Board[pos].Remove(Board[pos].Length - 1);
                int.TryParse(boardPos, out int number);
                if (CurrentPlayer == Board[pos].Last() || Board[pos] == "0")
                    number++;
                Board[pos] = number.ToString() + CurrentPlayer;
                if (CurrentPlayer != Board[pos].Last())
                {
                    var location = CurrentPlayer == White ? BLocations : WLocations;
                    location.Remove(number);
                }
                return true;
            }
            return false;
        }
        public string RemovePiece(string pos)
        {
            string test = pos.Replace(pos.Last().ToString(), "");
            int pieces = int.Parse(test) - 1;
            if (pieces == 0)
                return pieces.ToString();
            return pieces.ToString() + pos.Last();
        }
        public bool IsAvaliablePosition(int pos)
        {
            if (!IsOutOfBoard(pos))
                return ((Board[pos].Last() == CurrentPlayer) || Board[pos].First() == '1') || Board[pos] == "0";
            return false;
        }
#if DEBUG
        public void ShowBoard()
        {
            var locations = CurrentPlayer == Black ? BLocations : WLocations;
            Console.WriteLine();
            for (int i = 12; i < Board.Length; i++)
            {
                Console.Write(Board[i]);
                if (i + 1 < Board.Length)
                    Console.Write(' ');
            }
            Console.WriteLine();
            Console.WriteLine();
            for (int i = 11; i >= 0; i--)
            {
                Console.Write(Board[i]);
                if (i - 1 >= 0)
                {
                    Console.Write(' ');
                }
            }
            Console.WriteLine();
            Console.WriteLine(CurrentPlayer == Black ? "Black Locations:" : "White Locations");
            locations = CurrentPlayer == White ? [.. locations.OrderDescending()] : [.. locations.Order()];
            locations.ForEach(item => Console.Write($"{item} "));
        }
#endif
        public void DoMove(string jsonTurn)
        {
            try
            {
                var turn = JsonSerializer.Deserialize<Turn>(jsonTurn);
                if (turn != null)
                {
                    int futurePos = turn.FuturePosition;
                    int currentPos = turn.LastPosition;
                    if (IsWinnable() && futurePos == 24)
                    {
                        if ((IsPossible(currentPos, futurePos) || IsPossible(currentPos, futurePos)))
                        {
                            Dices.Remove(futurePos - currentPos);
                            ChangingPiece(currentPos);
                            if(HasWon())
                                Environment.Exit(0);
                            return;
                        }
                        var HighestRollPossible = futurePos - GetLocations().Max();
                        Dices.ForEach(item =>
                        {
                            if (HighestRollPossible < item)
                            {
                                Dices.Remove(item);
                                ChangingPiece(currentPos);
                                if (HasWon())
                                    Environment.Exit(0);
                                return;
                            }
                        });
                    }
                    if (!IsThereAvailableMoves())
                    {
                        Console.WriteLine("There is no legal move, Changing Turn");
                        Console.ReadLine();
                        ChangeTurn();
                        return;
                    }
                    var piecesEaten = GetListOfEaten();
                    if (IsEaten(futurePos, currentPos, piecesEaten)) 
                        return;
                    if (IsntAllowed(futurePos, currentPos, piecesEaten))
                    {
                        Console.WriteLine("You need to play the eaten piece to a good location");
                        Console.ReadLine();
                        return;
                    }
                    if (!(Board[futurePos].Last() == CurrentPlayer) && NumberOfPieces(Board[futurePos]) == 1)
                    {
                        _ = CurrentPlayer == Black ? EatenWhite++ : EatenBlack++;
                        _ = CurrentPlayer == Black ? WLocations.Remove(futurePos) : BLocations.Remove(futurePos);
                    }
                    if (AddPiece(futurePos))
                    {
                        Dices.Remove(futurePos - currentPos);
                        ChangingPiece(currentPos);
                    }
                }
            }
            catch
            {
            }
        }

        private bool HasWon()
        {
            if (GetLocations().Count == 0 && GetListOfEaten() == 0)
            {
                Console.WriteLine($"YOU WIN {(CurrentPlayer == White ? "White" : "black")}");
                return true;
            }
            return false;

        }

        private void ChangingPiece(int currentPos)
        {
            var lastPosition = Board[currentPos];
            Board[currentPos] = RemovePiece(lastPosition);
            if (Board[currentPos] == "0")
                _ = CurrentPlayer == White ? WLocations.Remove(currentPos) : BLocations.Remove(currentPos);
            return;
        }

        public bool IsPossible(int pos,int result) => 
            pos + DiceOne == result || pos + DiceTwo == result;
        public bool IsWinnable() => CurrentPlayer switch
        {
            Black => BLocations.All(location => (18 <= location && location <= 23)) && EatenBlack == 0,
            White => WLocations.All(location => (0 <= location && location <= 5)) && EatenWhite == 0,
            _ => false
        };

        private int GetCountOfEaten() =>
            CurrentPlayer == White ? EatenWhite : EatenBlack;
        private List<int> GetLocations() =>
            CurrentPlayer == White ? WLocations : BLocations;
        private bool IsntAllowed(int futurePos, int currentPos, int piecesEaten)
        {
            return piecesEaten > 0 || IsOutOfBoard(futurePos) || IsntCurrentPlayer(currentPos) || !IsCorrectRoll(currentPos, futurePos);
        }

        private bool IsEaten(int futurePos, int currentPos, int piecesEaten)
        {
            return currentPos == -1 && piecesEaten > 0 && IsEatenMovable(futurePos);
        }

        public int NumberOfPieces(string pos)
        {
            if (pos == null)
                return 0;
            if (int.TryParse(pos.Replace(pos.Last(), ' '), out int result))
                return result;
            return 0;
        }
        public List<int>? AvaliableMoves(int pos)
        {
            if (IsntCurrentPlayer(pos))
                return null;
            List<int> result = [];
            foreach (var roll in Dices)
                if (IsAvaliablePosition(pos + roll))
                {
                    if (DiceOne == DiceTwo)
                        return [pos + Dices[0]];
                    result.Add(pos + roll);
                }
            return result;
        }

        private int GetListOfEaten()
        {
            return CurrentPlayer == White ? EatenWhite : EatenBlack;
        }

        private bool IsntCurrentPlayer(int currentPos) =>
            IsOutOfBoard(currentPos) || Board[currentPos].Last() != CurrentPlayer;
        private static bool IsOutOfBoard(int futurePos) =>
            futurePos > 23 || futurePos < 0;
        public void ChangeLocations(int futurePos)
        {
            if (CurrentPlayer == White)
            {
                if (!WLocations.Contains(futurePos))
                    WLocations.Add(futurePos);
            }
            else
            {
                if (!BLocations.Contains(futurePos))
                    BLocations.Add(futurePos);
            }
        }
        public bool IsCorrectRoll(int current, int future)
        {
            foreach (var roll in Dices)
                if (current + roll == future)
                    return true;
            return false;
        }
        public void DiceRolls()
        {
            if (CurrentPlayer == default)
                CurrentPlayer = Rnd.Next(1, 6) > Rnd.Next(1, 6) ? Black : White;
            DiceOne = CurrentPlayer == White ? Rnd.Next(-6, 0) : Rnd.Next(1, 7);
            DiceTwo = CurrentPlayer == White ? Rnd.Next(-6, 0) : Rnd.Next(1, 7);
            Dices = DiceOne == DiceTwo ? [DiceOne, DiceTwo, DiceOne, DiceTwo] : [DiceOne, DiceTwo];
        }
        public void ChangeTurn()
        {
            CurrentPlayer = CurrentPlayer == Black ? White : Black;
            DiceRolls();
#if DEBUG
            Console.WriteLine($"Next Turn: {CurrentPlayer} Rolled ({Math.Abs(DiceOne)},{Math.Abs(DiceTwo)})");
#endif
        }
        public bool IsEatenMovable(int pos)
        {
            int roll = CurrentPlayer == White ? pos - 24 : pos + 1;
            if (!Dices.Contains(roll))
                return false;
            if (AddPiece(pos))
            {
                Dices.Remove(roll);
                _ = CurrentPlayer == White ? EatenWhite-- : EatenBlack--;
                return true;
            }
            return false;
        }
        public bool IsThereAvailableMoves()
        {
            var SelectedList = CurrentPlayer == White ? WLocations : BLocations;
            foreach (var pos in SelectedList)
            {
                if (IsAvaliablePosition(pos + DiceOne) || IsAvaliablePosition(pos + DiceTwo))
                    return true;
            }
            return false;
        }
    }
}

