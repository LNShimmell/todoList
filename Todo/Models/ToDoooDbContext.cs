using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace Todo.Models {
	public class ToDoooDbContext : DbContext {

		public DbSet<User> Users { get; set; }
		public DbSet<List> Lists { get; set; }

		public ToDoooDbContext() : base() {

		}
	}
}