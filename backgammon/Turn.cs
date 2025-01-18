using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Testing_Backgammon
{
    public class Turn
    {
        public int FuturePosition { get; set; }

        public int LastPosition { get; set; }
        public char Type { get; set; }

    }
}
