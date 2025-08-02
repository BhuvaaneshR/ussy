package main

import (
    "github.com/gin-gonic/gin"
    "college-marketplace/database"
    "college-marketplace/routes"
)

func main() {
    r := gin.Default()
    database.ConnectDB()
    routes.AuthRoutes(r)
    r.Run(":8080")
}
