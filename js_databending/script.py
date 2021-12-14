import cv2
import matplotlib.pyplot as plt
import numpy as np

img = cv2.imread('images/image.jpg')
img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
print(img)
print(img.shape)

# plt.imshow(img)
# plt.show()

flat = img.flatten()
print(flat)
print(flat.shape)
# print(img.shape[0] * img.shape[1] * img.shape[2])

from pysndfx import AudioEffectsChain
from scipy.io.wavfile import read, write

# Load data
sr, data = read('audio.wav')
print(data)
print(data.shape)
print(f'Original type: {data.dtype}')
print(np.average(data))
print(np.min(data), np.max(data))
print(f'Original sample rate: {sr}')

# Edit data
fx = (
    AudioEffectsChain()
    .reverb()
)
result = fx(data)
# result = result + abs(np.min(result))
print(f'\nRESULT:')
print(result)
print(result.shape)
print(f'result range: {np.min(result), np.max(result)}')
print(f'result type: {result.dtype}')

# Write data to file
write('out.wav', sr, result)
