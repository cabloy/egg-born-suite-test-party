package main

import (
	"fmt"
	"syscall/js"
)

func main() {
	fmt.Println("Hello, World!")
	alert := js.Global().Get("alert")
	alert.Invoke("alert!")
}
