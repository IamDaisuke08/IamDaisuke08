using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace Practice_01
{
    // Do not change the name of this class
    public class CustomStringEnumerator :  IEnumerable<string>
    {
        private EnumeratorConfig config;
        private IEnumerable<string> values;

        /// <summary> Constructor </summary>
        /// <exception cref="System.ArgumentNullException">If a collection is null</exception>
        /// <exception cref="System.ArgumentNullException">If an config is null</exception>
        public CustomStringEnumerator(IEnumerable<string> collection, EnumeratorConfig config)
        {
            // Console.WriteLine("Sample debug output");
            this.config = config ?? throw new ArgumentNullException(nameof(collection));
            this.values = collection ?? throw new ArgumentNullException(nameof(config));
        }

        private IEnumerable<string> GetValues()
        { 
            foreach(var value in values)
            {
                var valid = true;
                if (value != null)
                {
                    valid = this.config.MinLength < 0 || (this.config.MinLength > 0 && value.Length >= this.config.MinLength);
                    valid = valid && (this.config.MaxLength < 0 || (this.config.MaxLength > 0 && value.Length <= this.config.MaxLength));
                    if (config.StartWithCapitalLetter && !string.IsNullOrEmpty(value))
                    {
                        var charValue = value.ToCharArray();
                        valid = valid && char.IsUpper(charValue[0]);
                    }

                    if (config.StartWithDigit && !string.IsNullOrEmpty(value))
                    {
                        var charValue = value.ToCharArray();
                        valid = valid && int.TryParse(charValue[0].ToString(), out int n);
                    }

                    if (valid)
                    {
                        yield return value;
                    }
                }
            }
        }

        public IEnumerator<string> GetEnumerator()
        {
            return this.GetValues().GetEnumerator();
        }

        IEnumerator IEnumerable.GetEnumerator()
        {
            return GetEnumerator();
        }
    }

    public class EnumeratorConfig
    {
        // Specifies the minimal length of strings that should be returned by a custom enumerator.
        // If it is set to negative value then this option is ignored.
        public int MinLength { get; set; } = -1;

        // Specifies the maximum length of strings that should be returned by a custom enumerator.
        // If it is set to negative value then this option is ignored.
        public int MaxLength { get; set; } = -1;

        // Specifies that only strings that start with a capital letter should be returned by a custom enumerator.
        // Please note that empty or null strings do not meet this condition.
        public bool StartWithCapitalLetter { get; set; }

        // Specifies that only strings that start with a digit should be returned by a custom enumerator.
        // Please note that empty or null strings do not meet this condition.
        public bool StartWithDigit { get; set; }
    }


    class Program
    {
        static void Main(string[] args)
        {
            var collection = new string[] { "Test", "Collaborate", "education", "Committee", "As", null };
            var config = new EnumeratorConfig
            {
                MinLength = 3,
                MaxLength = 10,
                StartWithCapitalLetter = true
            };

            var enumerator = new CustomStringEnumerator(collection, config);
            foreach (var s in enumerator)
            {
                Console.WriteLine(s);
            }
        }
    }
}
