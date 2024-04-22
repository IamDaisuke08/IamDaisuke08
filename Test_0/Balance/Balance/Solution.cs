using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;


namespace Balance
{
    class Solution
    {
        public int solution(string S)
        {
            // write your code in C# 6.0 with .NET 4.5 (Mono)
            return GetShortestBalanced(S);
        }

        private int GetShortestBalanced(string word)
        {
            var upperCases = GetCapitalLetters(word);
            var split = word.ToArray();
            var notBalancedChars = split.Where(s => !upperCases.Any(u => Char.ToLower(s) == u));
            var words = word.Split(notBalancedChars.ToArray());
            var shortest = int.MaxValue;
            foreach (var item in words)
            {
                if (IsBalanced(item) && shortest > item.Length)
                {
                    shortest = item.Length;
                }
            }

            return shortest == int.MaxValue ? -1 : shortest;
        }

        private bool IsBalanced(string word)
        {
            if (word.Length > 1)
            {
                var upperCases = GetCapitalLetters(word);
                var split = word.ToArray();
                return split.All(x => upperCases.Any(y => Char.ToLower(x) == y));
            }

            return false;
        }

        private IEnumerable<char> GetCapitalLetters(string word)
        {
            return Regex
               .Matches(word, "[A-Z]")
               .OfType<Match>()
               .Select(match => match.Value).Select(x => char.Parse(x.ToLower()));
        }
    }
}
