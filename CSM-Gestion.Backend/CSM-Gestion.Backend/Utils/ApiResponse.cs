namespace CSM_Gestion.Backend.Utils
{
    public class ApiResponse<T>
    {
        public int StatusCode { get; set; }
        public bool IsSuccess { get; set; }
        public string Message { get; set; } = string.Empty;
        public T? Value { get; set; }

        public static ApiResponse<T> Success(T value, string message = "Operación exitosa", int statusCode = 200)
        {
            return new ApiResponse<T>
            {
                StatusCode = statusCode,
                IsSuccess = true,
                Message = message,
                Value = value
            };
        }

        public static ApiResponse<T> Fail(string message, int statusCode = 400)
        {
            return new ApiResponse<T>
            {
                StatusCode = statusCode,
                IsSuccess = false,
                Message = message,
                Value = default
            };
        }
    }
}
