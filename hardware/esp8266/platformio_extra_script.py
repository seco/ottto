from SCons.Script import DefaultEnvironment

env = DefaultEnvironment()

env.Replace(
    LOCAL_UPLOADERFLAGS=[
        "-p", "$UPLOAD_PORT",
        "write_flash", "0x000000",
    ],
    UPLOADCMD='lib/esptool.py $LOCAL_UPLOADERFLAGS $SOURCE',
)
