// app/api/execute-game/route.js
import { exec } from 'child_process';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // Path to your Python script
        const scriptPath = './scripts/script2.py'; // Adjust path if necessary

        return new Promise((resolve, ) => {
            exec(`python3 ${scriptPath}`, (error, stdout, stderr) => {
                if (error) {
                    resolve(NextResponse.json({ error: error.message }, { status: 500 }));
                    return;
                }
                if (stderr) {
                    resolve(NextResponse.json({ error: stderr }, { status: 400 }));
                    return;
                }
                resolve(NextResponse.json({ output: stdout }));
            });
        });
    } catch (err) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}