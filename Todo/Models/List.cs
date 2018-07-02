using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace Todo.Models {
	public class List {

		public int Id { get; set; }

		[Required]
		[StringLength(30)]
		public string Description { get; set; }

		[StringLength(1000)]
		public string Notes { get; set; }

		[Required]
		[Range(1, 5)]
		public int Priority { get; set; }

		[Required]
		public bool IsCompleted { get; set; }

		[Required]
		public int UserId { get; set; }
		public virtual User User { get; set; }

		public List() {

		}
	}
}