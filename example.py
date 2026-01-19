"""Bubble sort implementation."""
from typing import Iterable, List


def bubble_sort(values: Iterable[int]) -> List[int]:
    """Return a new list sorted using bubble sort."""
    items = list(values)
    n = len(items)
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if items[j] > items[j + 1]:
                items[j], items[j + 1] = items[j + 1], items[j]
                swapped = True
        if not swapped:
            break

    return items


if __name__ == "__main__":
    data = [5, 1, 4, 2, 8]
    sorted_data = bubble_sort(data)
    print(f"sorted: {sorted_data}")
