from http.server import HTTPServer, SimpleHTTPRequestHandler
import os
import sys

server_addr = "127.0.0.1"
PORT = 80
root_dir = r"C:\Users\Jun-PC\Documents\BCIT\comp-2910-project"
handler = SimpleHTTPRequestHandler

os.chdir(root_dir)

httpd = HTTPServer((server_addr, PORT), handler)
print("Serving " + server_addr + ":" + str(PORT));
try:
    httpd.serve_forever()
except KeyboardInterrupt:
    print("\nExiting...")
    sys.exit(0)
