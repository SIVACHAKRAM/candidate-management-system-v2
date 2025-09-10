from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

def get_connection():
    conn = sqlite3.connect('candidates.db')
    return conn

# Create table if not exists
with get_connection() as conn:
    conn.execute('''
        CREATE TABLE IF NOT EXISTS candidates (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT,
            phone_number TEXT,
            current_status TEXT,
            resume_link TEXT
        )
    ''')

@app.route('/api/candidates', methods=['GET'])
def get_candidates():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM candidates")
    rows = cursor.fetchall()
    conn.close()
    print("Fetched candidates:", rows)  # ✅ Log fetched data
    return jsonify(rows)

@app.route('/api/candidates', methods=['POST'])
def add_candidate():
    data = request.json
    print("Received data:", data)  # ✅ Confirm data is received

    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO candidates (name, email, phone_number, current_status, resume_link)
            VALUES (?, ?, ?, ?, ?)
        """, (
            data.get('name'),
            data.get('email'),
            data.get('phone_number'),
            data.get('current_status'),
            data.get('resume_link')
        ))
        conn.commit()
        print("✅ Candidate inserted successfully.")
    except Exception as e:
        print("❌ Error inserting candidate:", e)
    finally:
        conn.close()

    return jsonify({'message': 'Candidate added successfully'})

if __name__ == '__main__':
    app.run(debug=True)