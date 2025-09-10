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
    return jsonify(rows)

@app.route('/api/candidates', methods=['POST'])
def add_candidate():
    data = request.json
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
    conn.close()
    return jsonify({'message': 'Candidate added successfully'})

@app.route('/api/candidates/<int:id>', methods=['PUT'])
def update_candidate(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        UPDATE candidates SET name=?, email=?, phone_number=?, current_status=?, resume_link=?
        WHERE id=?
    """, (
        data.get('name'),
        data.get('email'),
        data.get('phone_number'),
        data.get('current_status'),
        data.get('resume_link'),
        id
    ))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate updated successfully'})

@app.route('/api/candidates/<int:id>', methods=['DELETE'])
def delete_candidate(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM candidates WHERE id=?", (id,))
    conn.commit()
    conn.close()
    return jsonify({'message': 'Candidate deleted successfully'})

@app.route('/api/candidates/search', methods=['GET'])
def search_candidates():
    name = request.args.get('name', '')
    status = request.args.get('status', '')
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM candidates
        WHERE name LIKE ? AND current_status LIKE ?
    """, (f"%{name}%", f"%{status}%"))
    rows = cursor.fetchall()
    conn.close()
    return jsonify(rows)

if __name__ == '__main__':
    app.run(debug=True)
