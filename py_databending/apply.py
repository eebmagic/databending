from functions import *

# Load image
print(f'Loading and flattening data')
imagepath = 'images/small.jpg'
img = Image.open(imagepath)
original_shape = img.size
width, height = original_shape

# Flatten to long arr
data = list(img.getdata())
flat = flattenPixels(data)

# Perform mutations
print(f'Applying mutations')
half = len(flat) // 2
third = len(flat) // 3
start = half
stop = start + third

# flat = noise(flat, std=30, start=0, stop=start)
flat = noise(flat, std=20)
flat = shift(flat, magnitude=3*width//5, start=start, stop=stop)
flat = echo(flat, width=width//6, weight=0.8, start=start, stop=-1)

# Return to original image shapes
print(f'Reshaping and saving')
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
