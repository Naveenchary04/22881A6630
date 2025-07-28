type StackType = 'frontend';
type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'fatal';

interface LogPayload {
  stack: StackType;
  level: LogLevel;
  package: string;
  message: string;
}

const API_ENDPOINT = 'http://20.244.56.144/evaluation-service/logs';

export async function Log(
  stack: StackType,
  level: LogLevel,
  packageName: string,
  message: string
): Promise<void> {
  const allowedStacks = ['frontend', 'backend'];
  const allowedLevels = ['debug', 'info', 'warn', 'error', 'fatal'];

  if (!allowedStacks.includes(stack)) {
    console.error(`Invalid stack: ${stack}`);
    return;
  }
  if (!allowedLevels.includes(level)) {
    console.error(`Invalid level: ${level}`);
    return;
  }

  const payload: LogPayload = {
    stack,
    level,
    package: packageName.toLowerCase(),
    message
  };

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error(`Logging failed with status: ${response.status}`);
    }
  } catch (err) {
    console.error('Logging error:', err);
  }
}
