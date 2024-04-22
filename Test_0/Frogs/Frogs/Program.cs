using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Frogs
{
    class Program
    {
        static void Main(string[] args)
        {
            var jump = new Solution();
            Console.WriteLine("Max distance for 2, 6, 8, 5 is : " + jump.solution(new int[] { 2, 6, 8, 5 }));
            Console.WriteLine("Max distance for 1, 5, 5, 2, 6 is : " + jump.solution(new int[] { 1, 5, 5, 2, 6 }));
            Console.WriteLine("Max distance for 1, 1 is : " + jump.solution(new int[] { 1, 1 }));
            Console.WriteLine("Max distance for 1, 2, 3, 4, 5, 6, 6, 7, 8, 9 is : " + jump.solution(new int[] { 1, 2, 3, 4, 5, 6, 6, 7, 8, 9 }));
            Console.WriteLine("Max distance for 9, 8, 8, 7, 6, 5, 4, 3, 2, 1, 1, 3 is : " + jump.solution(new int[] { 9, 8, 8, 7, 6, 5, 4, 3, 2, 1, 1, 3 }));
            Console.WriteLine("Max distance for 7, 9, 8, 8, 7, 6, 5, 4, 3, 2, 1, 1, 3, 1 is : " + jump.solution(new int[] { 7, 9, 8, 8, 7, 6, 5, 4, 3, 2, 1, 1, 3, 1 }));
            Console.ReadLine();
        }
    }
}
