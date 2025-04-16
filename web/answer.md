chatbot-app-id 
http://localhost:3000/chat/w1hDnVaHliAOhYMQ

open a debug edge
open -na "Microsoft Edge" --args --disable-web-security --user-data-dir="/tmp/edge-dev-profile"

搜索 chat 依赖文件
madge --ts-config ./tsconfig.json "app/(shareLayout)/chat/[token]/page.tsx" > depend