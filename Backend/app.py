from flask import Flask, jsonify, request
from flask_cors import CORS
from pymongo import MongoClient, errors
from bson import ObjectId
from bson.errors import InvalidId

app = Flask(__name__)
CORS(app)

# MongoDB connection
try:
    client = MongoClient('mongodb://localhost:27017/')
    db = client['restaurant-customer-management']  # Single database
    customers_collection = db['customers']          # Customers collection
    restaurant_collection = db['restaurants']        # Restaurants collection (changed name)
except errors.ConnectionError as e:
    print("Error connecting to MongoDB: ", e)
    exit(1)

# Helper function to convert MongoDB document to JSON serializable format
def customer_to_json(customer):
    return {
        "id": str(customer["_id"]),
        "name": customer["name"],
        "email": customer["email"],
        "phone": customer["phone"],
        "address": customer["address"],
        "dish_selected": customer["dish_selected"],
        "rating": customer["rating"]
    }

def restaurant_to_json(restaurant):
    return {
        "id": str(restaurant["_id"]),
        "name": restaurant["name"],
        "location": restaurant["location"],
        "cuisine": restaurant["cuisine"],
        "rating": restaurant["rating"]
    }

# Get all customers
@app.route('/customers', methods=['GET'])
def get_customers():
    try:
        customers = list(customers_collection.find())
        return jsonify([customer_to_json(customer) for customer in customers]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add a new customer
@app.route('/customers', methods=['POST'])
def add_customer():
    try:
        data = request.json
        if not data or not all(key in data for key in ["name", "email", "phone", "address", "dish_selected", "rating"]):
            return jsonify({"error": "Missing required fields"}), 400

        new_customer = {
            "name": data['name'],
            "email": data['email'],
            "phone": data['phone'],
            "address": data['address'],
            "dish_selected": data['dish_selected'],
            "rating": data['rating']
        }
        result = customers_collection.insert_one(new_customer)
        new_customer["_id"] = result.inserted_id
        return jsonify(customer_to_json(new_customer)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update a customer
@app.route('/customers/<id>', methods=['PUT'])
def update_customer(id):
    try:
        data = request.json
        if not data or not all(key in data for key in ["name", "email", "phone", "address", "dish_selected", "rating"]):
            return jsonify({"error": "Missing required fields"}), 400

        updated_customer = {
            "name": data['name'],
            "email": data['email'],
            "phone": data['phone'],
            "address": data['address'],
            "dish_selected": data['dish_selected'],
            "rating": data['rating']
        }

        try:
            result = customers_collection.update_one({"_id": ObjectId(id)}, {"$set": updated_customer})
        except InvalidId:
            return jsonify({"error": "Invalid customer ID format"}), 400

        if result.matched_count == 0:
            return jsonify({"error": "Customer not found"}), 404

        updated_customer["_id"] = ObjectId(id)
        return jsonify(customer_to_json(updated_customer)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete a customer
@app.route('/customers/<id>', methods=['DELETE'])
def delete_customer(id):
    try:
        try:
            result = customers_collection.delete_one({"_id": ObjectId(id)})
        except InvalidId:
            return jsonify({"error": "Invalid customer ID format"}), 400

        if result.deleted_count == 0:
            return jsonify({"error": "Customer not found"}), 404

        return jsonify({"message": "Customer deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Get all restaurants
@app.route('/restaurants', methods=['GET'])
def get_restaurants():
    try:
        restaurants = list(restaurant_collection.find())
        return jsonify([restaurant_to_json(restaurant) for restaurant in restaurants]), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Add a new restaurant
@app.route('/restaurants', methods=['POST'])
def add_restaurant():
    try:
        data = request.json
        if not data or not all(key in data for key in ["name", "location", "cuisine", "rating"]):
            return jsonify({"error": "Missing required fields"}), 400

        new_restaurant = {
            "name": data['name'],
            "location": data['location'],
            "cuisine": data['cuisine'],
            "rating": data['rating']
        }
        result = restaurant_collection.insert_one(new_restaurant)
        new_restaurant["_id"] = result.inserted_id
        return jsonify(restaurant_to_json(new_restaurant)), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Update a restaurant
@app.route('/restaurants/<id>', methods=['PUT'])
def update_restaurant(id):
    try:
        data = request.json
        if not data or not all(key in data for key in ["name", "location", "cuisine", "rating"]):
            return jsonify({"error": "Missing required fields"}), 400

        updated_restaurant = {
            "name": data['name'],
            "location": data['location'],
            "cuisine": data['cuisine'],
            "rating": data['rating']
        }

        try:
            result = restaurant_collection.update_one({"_id": ObjectId(id)}, {"$set": updated_restaurant})
        except InvalidId:
            return jsonify({"error": "Invalid restaurant ID format"}), 400

        if result.matched_count == 0:
            return jsonify({"error": "Restaurant not found"}), 404

        updated_restaurant["_id"] = ObjectId(id)
        return jsonify(restaurant_to_json(updated_restaurant)), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Delete a restaurant
@app.route('/restaurants/<id>', methods=['DELETE'])
def delete_restaurant(id):
    try:
        try:
            result = restaurant_collection.delete_one({"_id": ObjectId(id)})
        except InvalidId:
            return jsonify({"error": "Invalid restaurant ID format"}), 400

        if result.deleted_count == 0:
            return jsonify({"error": "Restaurant not found"}), 404

        return jsonify({"message": "Restaurant deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
