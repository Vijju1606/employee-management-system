using EmployeeApi.Models;
using MongoDB.Driver;
using EmployeeApi.Settings;
using Microsoft.Extensions.Configuration;

namespace EmployeeApi.Services
{
    public class EmployeeService
    {
        private readonly IMongoCollection<Employee> _employee;
        public EmployeeService(IConfiguration config)
        {
            var connectionString = config["MongoDbSettings:ConnectionString"];
            var databaseName = config["MongoDbSettings:DatabaseName"];
            var collectionName = config["MongoDbSettings:CollectionName"];

            var client = new MongoClient(connectionString); 
            var database = client.GetDatabase(databaseName);
            _employee = database.GetCollection<Employee>(collectionName);
        }
        public List<Employee> GetAll()
        {
            return _employee.Find(emp => true).ToList();
        }
        public Employee? GetById(string id)
        {
            return _employee.Find(x => x.Id == id).FirstOrDefault();
        }
        public void Create(Employee employee)
        {
            _employee.InsertOne(employee);
        }
        public void Update(string id, Employee updatedEmployee)
        {
            updatedEmployee.Id = id;
            _employee.ReplaceOne(x=>x.Id == id,updatedEmployee);
        }
        public void Delete(string id)
        {
            _employee.DeleteOne(x => x.Id == id);
        }
    }
}