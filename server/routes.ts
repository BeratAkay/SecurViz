import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { soarWidgetRequestSchema } from "@shared/schema";
import axios from "axios";

export async function registerRoutes(app: Express): Promise<Server> {
  // SOAR Widget API Proxy Endpoints
  // These endpoints will proxy requests to the SOAR API
  // The actual URL and Authorization token should be set in environment variables
  
  app.post("/api/soar/widget", async (req, res) => {
    try {
      const widgetRequest = soarWidgetRequestSchema.parse(req.body);
      
      const soarApiUrl = process.env.SOAR_API_URL;
      const soarApiAuth = process.env.SOAR_API_AUTH;
      
      if (!soarApiUrl || !soarApiAuth) {
        return res.status(500).json({ 
          error: "SOAR API configuration missing. Please set SOAR_API_URL and SOAR_API_AUTH environment variables." 
        });
      }

      const response = await axios.post(soarApiUrl, widgetRequest, {
        headers: {
          'Accept': 'application/json',
          'Authorization': soarApiAuth,
          'Content-Type': 'application/json',
        },
      });

      res.json(response.data);
    } catch (error) {
      console.error("SOAR API Error:", error);
      if (axios.isAxiosError(error)) {
        res.status(error.response?.status || 500).json({ 
          error: error.response?.data || error.message 
        });
      } else {
        res.status(500).json({ error: "Failed to fetch SOAR data" });
      }
    }
  });

  // Individual widget endpoints for easier frontend integration
  app.get("/api/soar/active-incidents", async (req, res) => {
    try {
      const widgetRequest = {
        id: "active-incidents-by-type",
        name: "Active Incidents - Pie chart",
        dataType: "incidents",
        widgetType: "bar",
        query: "-category:job and -status:archived and -status:closed and owner:csoc1",
        dateRange: {
          period: {
            by: "day",
            fromValue: 7,
            toValue: 0
          }
        },
        params: {
          groupBy: ["severity"]
        },
        category: ""
      };

      const soarApiUrl = process.env.SOAR_API_URL;
      const soarApiAuth = process.env.SOAR_API_AUTH;
      
      if (!soarApiUrl || !soarApiAuth) {
        return res.status(500).json({ 
          error: "SOAR API configuration missing" 
        });
      }

      const response = await axios.post(soarApiUrl, widgetRequest, {
        headers: {
          'Accept': 'application/json',
          'Authorization': soarApiAuth,
          'Content-Type': 'application/json',
        },
      });

      res.json(response.data);
    } catch (error) {
      console.error("SOAR API Error:", error);
      res.status(500).json({ error: "Failed to fetch active incidents data" });
    }
  });

  app.get("/api/soar/closed-incidents", async (req, res) => {
    try {
      const widgetRequest = {
        id: "closed-incidents-by-role",
        name: "Closed Incidents by Role",
        dataType: "incidents",
        widgetType: "bar",
        query: "status:closed and owner:csoc1",
        dateRange: {
          period: {
            by: "day",
            fromValue: 7,
            toValue: 0
          }
        },
        params: {
          groupBy: ["type"]
        },
        category: ""
      };

      const soarApiUrl = process.env.SOAR_API_URL;
      const soarApiAuth = process.env.SOAR_API_AUTH;
      
      if (!soarApiUrl || !soarApiAuth) {
        return res.status(500).json({ 
          error: "SOAR API configuration missing" 
        });
      }

      const response = await axios.post(soarApiUrl, widgetRequest, {
        headers: {
          'Accept': 'application/json',
          'Authorization': soarApiAuth,
          'Content-Type': 'application/json',
        },
      });

      res.json(response.data);
    } catch (error) {
      console.error("SOAR API Error:", error);
      res.status(500).json({ error: "Failed to fetch closed incidents data" });
    }
  });

  app.get("/api/soar/incident-types", async (req, res) => {
    try {
      const widgetRequest = {
        id: "incident-types-by-severity",
        name: "Incident Types by Severity",
        dataType: "incidents",
        widgetType: "bar",
        query: "-category:job and -status:archived and -status:closed and owner:csoc1",
        dateRange: {
          period: {
            by: "day",
            fromValue: 7,
            toValue: 0
          }
        },
        params: {
          groupBy: ["rawType", "severity"]
        },
        category: ""
      };

      const soarApiUrl = process.env.SOAR_API_URL;
      const soarApiAuth = process.env.SOAR_API_AUTH;
      
      if (!soarApiUrl || !soarApiAuth) {
        return res.status(500).json({ 
          error: "SOAR API configuration missing" 
        });
      }

      const response = await axios.post(soarApiUrl, widgetRequest, {
        headers: {
          'Accept': 'application/json',
          'Authorization': soarApiAuth,
          'Content-Type': 'application/json',
        },
      });

      res.json(response.data);
    } catch (error) {
      console.error("SOAR API Error:", error);
      res.status(500).json({ error: "Failed to fetch incident types data" });
    }
  });

  app.get("/api/soar/active-indicators", async (req, res) => {
    try {
      const widgetRequest = {
        id: "active-indicators-by-verdict",
        name: "Active Indicators by Verdict",
        dataType: "indicators",
        widgetType: "pie",
        query: "(expirationStatus:active or expirationStatus:\"\")",
        dateRange: {
          period: {
            by: "day",
            fromValue: 7,
            toValue: 0
          }
        },
        params: {
          groupBy: ["score"]
        },
        category: ""
      };

      const soarApiUrl = process.env.SOAR_API_URL;
      const soarApiAuth = process.env.SOAR_API_AUTH;
      
      if (!soarApiUrl || !soarApiAuth) {
        return res.status(500).json({ 
          error: "SOAR API configuration missing" 
        });
      }

      const response = await axios.post(soarApiUrl, widgetRequest, {
        headers: {
          'Accept': 'application/json',
          'Authorization': soarApiAuth,
          'Content-Type': 'application/json',
        },
      });

      res.json(response.data);
    } catch (error) {
      console.error("SOAR API Error:", error);
      res.status(500).json({ error: "Failed to fetch active indicators data" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
