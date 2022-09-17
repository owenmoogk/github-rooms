import qrcode

img = qrcode.make('https://owenmoogk.github.io/projects')

print(type(img))
print(img.size)
# <class 'qrcode.image.pil.PilImage'>
# (290, 290)

img.save('owenmoogk.png')
