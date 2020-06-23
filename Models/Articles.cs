using System;
using System.Collections.Generic;

namespace L9.Models
{
    public partial class Articles
    {
        public int Id { get; set; }
        public string User { get; set; }
        public int? Journalid { get; set; }
        public string Summary { get; set; }
        public int? Date { get; set; }

        public virtual Journals Journal { get; set; }
    }
}
