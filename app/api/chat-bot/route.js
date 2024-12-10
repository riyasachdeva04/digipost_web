import { spawn } from 'child_process';

export async function POST(req) {
    try {
        console.log('hellloooo')
        const body = await req.json();
        const chatMessage = body.message;

        return new Promise((resolve, reject) => {
            const pythonProcess = spawn('python3', ['./scripts/script4.py', chatMessage]);

            const output = [];
            pythonProcess.stdout.on('data', (data) => {
                output.push(data.toString());
            });

            pythonProcess.stderr.on('data', (data) => {
                console.error(`stderr: ${data}`);
                reject(new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), { status: 500 }));
            });

            pythonProcess.on('close', (code) => {
                if (code === 0) {
                    resolve(new Response(JSON.stringify({ response: output.join('') }), { status: 200 }));
                } else {
                    reject(new Response(JSON.stringify({ error: 'An error occurred while processing your request.' }), { status: 500 }));
                }
            });
        });
    } catch (error) {
        console.error('API Route Error:', error);
        return new Response(JSON.stringify({ error: 'Invalid request' }), { status: 400 });
    }
}
