using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Todo.Models;
using Todo.Utility;


namespace Todo.Controllers
{
	public class UsersController : ApiController {
		private ToDoooDbContext db = new ToDoooDbContext();

		[HttpGet]
		[ActionName("List")]
		public JsonResponse ListUsers() {
			JsonResponse json = new JsonResponse();
			json.Data = db.Users.ToList();
			db.SaveChanges();
			return json;

		}

		[HttpGet]
		[ActionName("Find")]
		public JsonResponse FindById(int? Id) {
			JsonResponse json = new JsonResponse();
			if (Id == null) {
				json.Message = "Id does not exist, please enter a valid Id";
				json.Result = "Failed";
				json.Error = "unknown Id";
				return json;
			}
			json.Data = db.Users.Find(Id);
			return json;

		}

		[HttpPost]
		[ActionName("Create")]
		public JsonResponse CreateNewUser(User user) {
			JsonResponse json = new JsonResponse();
			if (!(ModelState.IsValid) || user == null) {
				json.Result = "Failed";
				json.Message = " Enter the approprate fields";
				return json;
			}
			json.Data = db.Users.Add(user);
			db.SaveChanges();
			return json;
		}

		[HttpPost]
		[ActionName("Edit")]
		public JsonResponse EditUser(User user) {
			JsonResponse json = new JsonResponse();
			if (!(ModelState.IsValid) || user == null) {
				json.Error = "Something whent wrong. Oh no!";
				json.Message = "It's likely that one of your properties are out of wack yo.";
				return json;
			}
			db.Entry(user).State = System.Data.Entity.EntityState.Modified;
			db.SaveChanges();
			json.Data = user;
			return json;
		}

		[HttpPost]
		[ActionName("Remove")]
		public JsonResponse RemoveUser(User user) {
			if (user == null) {
				return new JsonResponse {
					Result = "Failed", Error = "No valid user", Message = "Something went wrong."
				};
			}

			db.Users.Remove(user);
			db.SaveChanges();
			return new JsonResponse {
				Data = user, Message = $"User Id: {user.Id} was removed"
			};
		}

		[HttpGet]
		[ActionName("List-sort")]
		public JsonResponse listSort() {
			IEnumerable<User> users = db.Users.ToList();
			JsonResponse json = new JsonResponse();
		
			json.Data = users.OrderBy(u => u.Lastname).ToList();
			return json;
		}



	}
}
