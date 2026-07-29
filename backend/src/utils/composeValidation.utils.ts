import yaml from "yaml";

export interface ComposeValidationResult {
  valid: boolean;

  errors: string[];
}

interface ComposeService {
  privileged?: boolean;

  pid?: string;

  network_mode?: string;

  ipc?: string;

  cap_add?: string[];

  volumes?: string[];
}

class ComposeValidationUtils {
  validate(content: string): ComposeValidationResult {
    const errors: string[] = [];

    /*
        |--------------------------------------------------------------------------
        | YAML VALIDATION
        |--------------------------------------------------------------------------
        */

    let compose: any;

    try {
      compose = yaml.parse(content);
    } catch {
      return {
        valid: false,

        errors: ["Le fichier docker-compose contient un YAML invalide"],
      };
    }

    /*
        |--------------------------------------------------------------------------
        | STRUCTURE MINIMALE
        |--------------------------------------------------------------------------
        */

    if (!compose || typeof compose !== "object") {
      errors.push("Configuration docker-compose invalide");

      return {
        valid: false,

        errors,
      };
    }

    if (!compose.services || typeof compose.services !== "object") {
      errors.push("Aucun service Docker détecté");
    }

    /*
        |--------------------------------------------------------------------------
        | VALIDATION DES SERVICES
        |--------------------------------------------------------------------------
        */

    if (compose.services) {
      for (const [serviceName, service] of Object.entries(compose.services) as [
        string,

        ComposeService,
      ][]) {
        if (!service || typeof service !== "object") {
          errors.push(`Service invalide : ${serviceName}`);

          continue;
        }

        /*
                |--------------------------------------------------------------------------
                | OPTIONS DANGEREUSES
                |--------------------------------------------------------------------------
                */

        const dangerousOptions = [
          "privileged",

          "pid",

          "network_mode",

          "ipc",

          "cap_add",
        ];

        for (const option of dangerousOptions) {
          if (service[option as keyof ComposeService]) {
            errors.push(
              `Service ${serviceName} : configuration dangereuse détectée (${option})`,
            );
          }
        }

        /*
                |--------------------------------------------------------------------------
                | VOLUMES DANGEREUX
                |--------------------------------------------------------------------------
                */

        if (Array.isArray(service.volumes)) {
          for (const volume of service.volumes) {
            const volumeValue = String(volume).toLowerCase();

            const dangerousVolumes = [
              "/:/",

              ":/",

              "/etc:",

              "/root:",

              "/proc:",

              "/sys:",

              "/var/run/docker.sock",
            ];

            for (const dangerousPath of dangerousVolumes) {
              if (volumeValue.includes(dangerousPath)) {
                errors.push(
                  `Service ${serviceName} : volume dangereux détecté (${volume})`,
                );
              }
            }
          }
        }
      }
    }

    return {
      valid: errors.length === 0,

      errors,
    };
  }
}

export default new ComposeValidationUtils();
