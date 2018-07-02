using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Todo.Utility {
	public class JsonResponse {

		public string Message { get; set; } = "Ok";
		public string Result { get; set; } = "Success";
		public object Data { get; set; }
		public string Error { get; set; } = null;
	}
}