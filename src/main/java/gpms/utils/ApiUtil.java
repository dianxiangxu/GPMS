package gpms.utils;

import gpms.model.ApiError;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * Collection of utility methods.
 */
public class ApiUtil {
    private static ObjectMapper om = new ObjectMapper();

    /**
     * Formats an error message as JSON.
     *
     * @param error The error message to be formatted.
     * @return The JSON representation of the error message.
     * @throws JsonProcessingException
     */
    public static String formatError(String error) throws JsonProcessingException {
        return om.writeValueAsString(new ApiError(error));
    }
}
