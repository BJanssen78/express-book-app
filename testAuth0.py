import http.client

conn = http.client.HTTPSConnection("dev-xv5xjqn12brasz2i.us.auth0.com")

payload = "{\"client_id\":\"bsfAmmYtfvzhQ4Dhlhs1NNSIxCeNhMLf\",\"client_secret\":\"j3OkEYOOkh3CUtMqN_X8tCwYp8fGBc8tU-b7wbJMeXww59S0hBcg4uFvxRO0MiqD\",\"audience\":\"http://book-store-api\",\"grant_type\":\"client_credentials\"}"

headers = { 'content-type': "application/json" }

conn.request("POST", "/oauth/token", payload, headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))