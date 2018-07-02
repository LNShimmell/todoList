namespace Todo.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Lists",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Description = c.String(nullable: false, maxLength: 30),
                        Notes = c.String(maxLength: 1000),
                        Priority = c.Int(nullable: false),
                        IsCompleted = c.Boolean(nullable: false),
                        UserId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Users", t => t.UserId, cascadeDelete: true)
                .Index(t => t.UserId);
            
            CreateTable(
                "dbo.Users",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Username = c.String(nullable: false, maxLength: 20),
                        Password = c.String(nullable: false, maxLength: 30),
                        Email = c.String(nullable: false, maxLength: 80),
                        Firstname = c.String(nullable: false, maxLength: 30),
                        Lastname = c.String(nullable: false, maxLength: 30),
                        IsManager = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .Index(t => t.Username, unique: true);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Lists", "UserId", "dbo.Users");
            DropIndex("dbo.Users", new[] { "Username" });
            DropIndex("dbo.Lists", new[] { "UserId" });
            DropTable("dbo.Users");
            DropTable("dbo.Lists");
        }
    }
}
