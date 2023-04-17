#!/usr/bin/python
# -*- coding: utf-8 -*-

from PIL import Image
import os
import asyncio

tasks = []


async def ConImg(imgPath) -> None:
    # Image方法不是异步的，所以await不需要添加
    img = Image.open(imgPath)
    img_01 = img.convert("L")
    img_01.save("dark_" + imgPath)


async def main(icon_path):
    # 切换工作路径
    os.chdir(icon_path)
    # 获取工作路径下的文件名
    files = os.listdir(icon_path)
    for f in files:
        task = asyncio.create_task(ConImg(f))
        # 加入taks
        tasks.append(task)

    await asyncio.wait(tasks)


if __name__ == '__main__':
    try:
        icon_path = input("请输入文件夹绝对地址:")
        if os.path.isdir(icon_path):
            asyncio.run(main(icon_path))
    except KeyboardInterrupt:
        print("程序终止")
    else:
        print("全部成功")
