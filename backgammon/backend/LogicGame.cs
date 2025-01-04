using System.Text.Json;
namespace Testing_Backgammon
{
    public class LogicGame
    {
        string[] board = new string[24];
        char CurrentPlayer;
        List<int> yLocations = new List<int> { 0, 18, 16, 11 };
        List<int> xLocations = new List<int> { 23, 5, 7, 12 };
        readonly Random rnd = new Random();
        int diceOne, diceTwo;
        public void InitializeBoard()
        {
            for (int i = 0; i < board.Length; i++)
            {
                board[i] = "0";
            }
            board[0] = "2y";
            board[23] = "2x";
            board[5] = "5x";
            board[18] = "5y";
            board[7] = "3x";
            board[16] = "3y";
            board[11] = "5y";
            board[12] = "5x";
            Console.WriteLine($"The Current player {CurrentPlayer}");
        }
        public bool AddPiece(int pos)
        {
            if (AvaliablePosition(pos))
            {
                int number = int.Parse((board[pos][0]).ToString()) + 1;
                board[pos] = number.ToString() + CurrentPlayer;
                return true;
            }
            return false;
        }
        public string RemovePiece(string pos)
        {
            string test = pos.Replace(pos.Last().ToString(), "");
            int pieces = int.Parse(test) - 1;
            if (pieces == 0)
            {
                return pieces.ToString();
            }
            return pieces.ToString() + pos.Last();
        }
        public bool AvaliablePosition(int pos)
        {
            if(!IsOutOfBoard(pos)) 
                return ((board[pos].Last() == CurrentPlayer) || board[pos].First() == '1') || board[pos] == "0";
            return false;
        }
        public void ShowBoard()
        {
            var locations = CurrentPlayer == 'y' ? yLocations : xLocations;
            Console.WriteLine();
            for (int i = 12; i < board.Length; i++)
            {
                Console.Write(board[i]);
                if (i + 1 < board.Length)
                    Console.Write(' ');
            }
            Console.WriteLine();
            Console.WriteLine();
            for (int i = 11; i >= 0; i--)
            {
                Console.Write(board[i]);
                if (i - 1 >= 0)
                {
                    Console.Write(' ');
                }
            }
            Console.WriteLine();
            Console.WriteLine(CurrentPlayer == 'y' ? "Y Locations:" : "X Locations");
            locations = CurrentPlayer == 'x' ? [.. locations.OrderDescending()] : [.. locations.Order()];
            locations.ForEach(item => Console.Write($"{item} "));
        }
        public void DoMove(string jsonTurn)
        {
            try
            {
                var turn = JsonSerializer.Deserialize<Turn>(jsonTurn);

                if (turn != null)
                {
                    int futurePos = turn.FuturePosition;
                    int currentPos = turn.LastPosition;
                    if (IsOutOfBoard(futurePos) || IsntCurrentPlayer(currentPos) || !CorrectRoll(futurePos, currentPos))
                        return;
                    if (AvaliablePosition(currentPos) && AddPiece(futurePos))
                    {
                        var lastPosition = board[currentPos];
                        board[currentPos] = RemovePiece(lastPosition);
                        if (board[turn.LastPosition] == "0")
                            _ = CurrentPlayer == 'x' ? xLocations.Remove(currentPos) : yLocations.Remove(currentPos);
                        ChangeLocations(currentPos, futurePos);
                    }
                }
            }
            catch
            {
            }
        }
        public List<int>? AvaliableMoves(int pos)
        {
            if (IsntCurrentPlayer(pos))
                return default;
            List<int> result = [];
            if (AvaliablePosition(pos + diceOne))
                result.Add(pos + diceOne);
            if (AvaliablePosition(pos + diceTwo))
                result.Add(pos + diceTwo);
            return result;     
        }
        private bool IsntCurrentPlayer(int currentPos)
        {
            return board[currentPos].Last() != CurrentPlayer;
        }

        private static bool IsOutOfBoard(int futurePos)
        {
            return futurePos > 23 || futurePos < 0;
        }

        public void ChangeLocations(int currentPos, int futurePos)
        {
            if (CurrentPlayer == 'x')
            {
                if (!xLocations.Contains(futurePos))
                    xLocations.Add(futurePos);
            }
            else if (CurrentPlayer == 'y')
            {
                if (!yLocations.Contains(futurePos))
                    yLocations.Add(futurePos);
            }
        }
        public bool CorrectRoll(int future, int current) => (current + diceOne == future) || (current + diceTwo == future);
        public List<int> DiceRolls()
        {
            diceOne =  rnd.Next(1, 7);
            diceTwo =  rnd.Next(1, 7);
            return diceOne == diceTwo ? [diceOne, diceTwo, diceOne, diceTwo] : [diceOne, diceTwo];
        }
        public bool IsThereAvailableMoves(bool eatenPiece = false)
        {
            //TODO - eatenPiece Logic
            //if (eatenPiece) - TODO
            //{
            //    return AddPiece(diceOne, player) || AddPiece(diceTwo, player);
            //}
            var SelectedList = CurrentPlayer == 'x' ? xLocations : yLocations;
            foreach (var pos in SelectedList)
            {
                if (AvaliablePosition(pos + diceOne) || AvaliablePosition(pos + diceTwo))
                    return true;
            }
            return false;
        }
        public List<int> WhoStarts() 
        {
            List<int> list = new List<int>();
            while (diceTwo == diceOne)
                list = DiceRolls();
            CurrentPlayer = diceTwo > diceOne ? 'x' : 'y';
            if (CurrentPlayer == 'x')
            {
                diceOne = int.IsPositive(diceOne) ? diceOne * -1 : diceOne;
                diceTwo = int.IsPositive(diceTwo) ? diceTwo * -1 : diceTwo;
            }
            return list;
        }
    }
}

