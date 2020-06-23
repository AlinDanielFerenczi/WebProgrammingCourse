using System;
using System.Collections.Generic;

namespace L9.Models
{
    public partial class Journals
    {
        public Journals()
        {
            Articles = new HashSet<Articles>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Articles> Articles { get; set; }
    }
}
