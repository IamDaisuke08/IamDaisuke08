using System;

// you can also use other imports, for example:
// using System.Collections.Generic;
// you can write to stdout for debugging purposes, e.g.
// Console.WriteLine("this is a debug message");
class Solution
{
    #region Methods

    public int solution(int[] blocks)
    {
        // write your code in C# 6.0 with .NET 4.5 (Mono)
        var maxDistance = 0;
        for(int i = 0; i < blocks.Length; i++)
        {
            var distance = JumpLeft(blocks, i) + JumpRight(blocks, i) + 1;
            maxDistance = maxDistance < distance ? distance : maxDistance;
        }

        return maxDistance;
    }

    private int JumpLeft(int[] jumpingBlocks, int index)
    {
        int height = 0, jumps = 0;
        for (int i = index; i >= 1; i--)
        {
            height = jumpingBlocks[i];
            if (height > jumpingBlocks[i - 1])
            {
                break;
            }

            jumps++;
        }

        return jumps;
    }

    private int JumpRight(int[] jumpingBlocks, int index)
    {
        int height = 0, jumps = 0;
        for (int i = index; i < jumpingBlocks.Length - 1; i++)
        {
            height = jumpingBlocks[i];
            if (height > jumpingBlocks[i + 1])
            {
                break;
            }

            jumps++;
        }

        return jumps;
    }

    #endregion Methods
}