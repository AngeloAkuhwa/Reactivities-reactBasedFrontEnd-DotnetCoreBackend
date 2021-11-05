namespace Reactivities.Application.Core
{
    public class Result<T>
    {
        public bool Isuccess { get; set; }
        public T Value { get; set; }
        public string Error { get; set; }
        public static Result<T> Success(T value) => new Result<T> { Isuccess = true, Value = value };
        public static Result<T> Falure(string error) => new Result<T> { Isuccess = true, Error = error };
    }
}
