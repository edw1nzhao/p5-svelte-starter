<script lang="ts">
  import ExampleWrapper from "$lib/components/examples/ExampleWrapper.svelte";
  import type { Sketch, P5Extended } from "$lib/core/types";

  function generate(p5: P5Extended) {
    const { _currentCells, _nextCells, _columnCount, _rowCount } = p5;
    if (!_currentCells || !_nextCells || !_columnCount || !_rowCount) return;

    for (let column = 0; column < _columnCount; column++) {
      for (let row = 0; row < _rowCount; row++) {
        const left = (column - 1 + _columnCount) % _columnCount;
        const right = (column + 1) % _columnCount;
        const above = (row - 1 + _rowCount) % _rowCount;
        const below = (row + 1) % _rowCount;

        const neighbours =
          _currentCells[left][above] +
          _currentCells[column][above] +
          _currentCells[right][above] +
          _currentCells[left][row] +
          _currentCells[right][row] +
          _currentCells[left][below] +
          _currentCells[column][below] +
          _currentCells[right][below];

        if (neighbours < 2 || neighbours > 3) {
          _nextCells[column][row] = 0;
        } else if (neighbours === 3) {
          _nextCells[column][row] = 1;
        } else {
          _nextCells[column][row] = _currentCells[column][row];
        }
      }
    }

    // Swap arrays
    const temp = p5._currentCells;
    p5._currentCells = p5._nextCells;
    p5._nextCells = temp;
  }

  const sketch: Sketch = {
    setup: (p5) => {
      const cellSize = 20;
      const columnCount = Math.floor(p5.width / cellSize);
      const rowCount = Math.floor(p5.height / cellSize);

      p5.frameRate(10);
      p5._cellSize = cellSize;
      p5._columnCount = columnCount;
      p5._rowCount = rowCount;

      // Initialize arrays
      p5._currentCells = Array(columnCount).fill(null).map(() => Array(rowCount).fill(0));
      p5._nextCells = Array(columnCount).fill(null).map(() => Array(rowCount).fill(0));

      // Initial randomization
      for (let column = 0; column < columnCount; column++) {
        for (let row = 0; row < rowCount; row++) {
          p5._currentCells[column][row] = p5.random([0, 1]);
        }
      }
    },

    draw: (p5) => {
      generate(p5);

      for (let column = 0; column < p5._columnCount!; column++) {
        for (let row = 0; row < p5._rowCount!; row++) {
          const cell = p5._currentCells![column][row];
          p5.fill((1 - cell) * 255);
          p5.stroke(0);
          p5.rect(column * p5._cellSize!, row * p5._cellSize!, p5._cellSize!, p5._cellSize!);
        }
      }
    },

    mousePressed: (p5) => {
      // Randomize on click
      for (let column = 0; column < p5._columnCount!; column++) {
        for (let row = 0; row < p5._rowCount!; row++) {
          p5._currentCells![column][row] = p5.random([0, 1]);
        }
      }
    }
  };
</script>

<ExampleWrapper
  title="Game of Life"
  description="Conway's Game of Life implemented in P5.js. Click anywhere to randomize the board."
  {sketch}
/>