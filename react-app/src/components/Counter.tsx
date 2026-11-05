import { useState } from 'react';

type CounterProps = {
  initVal: number;
};

export function Counter({ initVal }: CounterProps) {
  const [count, setCount] = useState(initVal);

  return (
    <div className="counter-widget">
      <p className="counter">
        Counter is <span>{count}</span>
      </p>

      <div className="button-group">
        <button
          type="button"
          className="btn-primary"
          onClick={() => setCount(count => count - 1)}
        >
          - Decrease
        </button>

        <button
          type="button"
          className="btn-reset"
          onClick={() => setCount(initVal)}
        >
          Reset
        </button>

        <button
          type="button"
          className="btn-primary"
          onClick={() => setCount(count => count + 1)}
        >
          + Increase
        </button>
      </div>
    </div>
  )
};