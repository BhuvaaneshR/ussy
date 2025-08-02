package routes

import (
    "github.com/gin-gonic/gin"
    "college-marketplace/controllers"

)

func AuthRoutes(r *gin.Engine) {
    r.POST("/signup", controllers.Register)
    r.POST("/login", controllers.Login)
}
