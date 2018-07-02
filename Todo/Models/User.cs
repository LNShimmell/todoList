using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Todo.Models {
	public class User {

		public int Id { get; set; }

		[Required]
		[Index(IsUnique = true)]
		[StringLength(20)]
		public string Username { get; set; }

		[Required]
		[MinLength(8)]
		[StringLength(30)]
		public string Password { get; set; }

		[Required]
		[StringLength(80)]
		public string Email { get; set; }

		[Required]
		[StringLength(30)]
		public string Firstname { get; set; }

		[Required]
		[StringLength(30)]
		public string Lastname { get; set; }

		[Required]
		public bool IsManager { get; set; } = false;

		public User() {

		}
	}
}