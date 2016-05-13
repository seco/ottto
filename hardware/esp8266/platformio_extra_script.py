from SCons.Script import DefaultEnvironment
import os


env = DefaultEnvironment()

env.Replace(
    LOCAL_UPLOADERFLAGS=[
        "-p", "$UPLOAD_PORT",
        "write_flash", "0x000000",
    ],
    UPLOADER="../esptool.py",
    UPLOADCMD="$UPLOADER $LOCAL_UPLOADERFLAGS $SOURCE",
)
