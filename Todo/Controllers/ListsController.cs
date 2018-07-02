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
    public class ListsController : ApiController
    {
		private ToDoooDbContext db = new ToDoooDbContext();

		[HttpGet]
		[ActionName("List")]
		public JsonResponse ListLists() {
			JsonResponse json = new JsonResponse();
			json.Data = db.Lists.ToList();
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
			json.Data = db.Lists.Find(Id);
			return json;

		}

		[HttpPost]
		[ActionName("Create")]
		public JsonResponse CreateNewList(List List) {
			JsonResponse json = new JsonResponse();
			if (!(ModelState.IsValid) || List == null) {
				json.Result = "Failed";
				json.Message = " Enter the approprate fields";
				return json;
			}
			json.Data = db.Lists.Add(List);
			db.SaveChanges();
			return json;
		}

		[HttpPost]
		[ActionName("Edit")]
		public JsonResponse EditList(List List) {
			JsonResponse json = new JsonResponse();
			if (!(ModelState.IsValid) || List == null) {
				json.Error = "Something whent wrong. Oh no!";
				json.Message = "It's likely that one of your properties are out of wack yo.";
				return json;
			}
			db.Entry(List).State = System.Data.Entity.EntityState.Modified;
			db.SaveChanges();
			json.Data = List;
			return json;
		}

		[HttpPost]
		[ActionName("Remove")]
		public JsonResponse RemoveList(List List) {
			if (List == null) {
				return new JsonResponse {
					Result = "Failed", Error = "No valid List", Message = "Something went wrong."
				};
			}

			db.Lists.Remove(List);
			db.SaveChanges();
			return new JsonResponse {
				Data = List, Message = $"List Id: {List.Id} was removed"
			};
		}

		[HttpGet]
		[ActionName("List-sort")]
		public JsonResponse listSort() {
			IEnumerable<List> Lists = db.Lists.ToList();
			JsonResponse json = new JsonResponse();

			json.Data = Lists.OrderBy(u => u.Priority).ToList();
			return json;
		}

		[HttpGet]
		[ActionName("ListbyUser")]
		public JsonResponse ListbyUser(int? Id) {
			JsonResponse json = new JsonResponse();
			json.Data = db.Lists.Where(u => u.UserId == Id).ToList();

			return json;
		}

		[HttpGet]
		[ActionName("ListbyUser-sorted")]
		public JsonResponse ListbyUsersort(int? Id) {
			JsonResponse json = new JsonResponse();
			IEnumerable<List> list = db.Lists.Where(u => u.UserId == Id).ToList();
			json.Data = list.OrderBy(p => p.Priority).ToList();

			return json;
		}


	}
}
