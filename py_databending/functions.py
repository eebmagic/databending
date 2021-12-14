from PIL import Image
import cv2
import numpy as np
from typing import List, Tuple


def flattenPixels(data: List[Tuple[int]]) -> np.array:
    return np.array(data).flatten()

def flatToPixels(data: np.array) -> np.array:
    result = data.reshape(len(data)//3, 3)
    return result

def noise(data: np.array, start=0, stop=-1, std='sqrmean') -> np.array:
    '''
    Args:
        data: np array of data to apply noise to
        start: starting index of noise
        stop: ending index of noise
        std: standard deviation of noise
    Return:
        result: flat np array of uint8 with noise added to original data
    '''
    assert stop >= -1, 'stop index should be positive int'
    assert stop > start or stop == -1, 'stop index should be larger than start index'

    if std == 'sqrmean':
        std = np.sqrt(data.mean())

    if stop == -1:
        stop = len(data)
    length = stop - start
    stop = start + length

    mean = 0
    noise = np.random.normal(mean, std, length)

    result = data.copy()
    result[start:stop] = result[start:stop] + noise
    result = result.astype(np.uint8)

    return result


def echo(data: np.array, start=0, stop=-1, width=60, weight=0.5):
    '''
    Args:
        data: np array of data to apply echo to
        start: starting index of noise
        stop: ending index of noise
        width: width of echo
        weight: amount that echoed pixel should apply to current
    Return:
        result: flat np array of uint8 with echo added to original data
    '''
    assert stop >= -1, 'stop index should be positive int'
    assert stop > start or stop == -1, 'stop index should be larger than start index'
    assert width < len(data), 'width must be smaller than length of data'

    if stop == -1:
        stop = len(data)
    length = stop - start
    stop = start + length

    if width < 0:
        start += width
        stop += width

    built = data.copy()
    ### TODO: Rewrite this to use numpy instead of for loop
    for i in range(start+width, stop):
        newval = built[i] + (data[i-width] * weight)
        newval = (newval / max(255, newval)) * 255
        built[i] = newval

    built = built.astype(np.uint8)
    return built


def shift(data: np.array, magnitude=10, start=0, stop=-1):
    assert stop >= -1, 'stop index should be positive int'
    assert stop > start or stop == -1, 'stop index should be larger than start index'

    if stop == -1:
        stop = len(data)
    length = stop - start
    stop = start + length

    selection = data[start:stop]
    selection = np.roll(selection, magnitude)

    result = data.copy()
    result[start:stop] = selection

    return result


if __name__ == '__main__':
    # Load image
    # imagepath = 'images/small.jpg'
    imagepath = 'images/image.jpg'
    img = Image.open(imagepath)
    original_shape = img.size

    # Flatten to long arr
    data = list(img.getdata())
    flat = flattenPixels(data)
    print(original_shape)
    print(flat.shape)
    print(len(data), len(data)*3)

    # Perform mutations
    half = len(flat) // 2
    third = len(flat) // 3
    start = half
    stop = start + third

    # flat = noise(flat, std=30, start=0, stop=start)
    flat = noise(flat, std=20)
    flat = shift(flat, magnitude=3*50, start=start, stop=stop)
    flat = echo(flat, weight=0.8, start=start, stop=-1)

    # Return to original image shapes
    reshaped = flatToPixels(flat).astype(np.uint8)
    reshaped = reshaped.reshape(*original_shape[::-1], 3)

    # Save result
    reshaped = cv2.cvtColor(reshaped, cv2.COLOR_BGR2RGB)
    print(type(reshaped), reshaped.shape)
    cv2.imwrite('result.png', reshaped)

    # Show result
    cv2.imshow('image', reshaped)
    cv2.waitKey(0)
    cv2.destroyAllWindows()