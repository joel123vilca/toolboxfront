const API_BASE_URL = "http://localhost:3001";

class FileController {
  static async getFiles() {
    try {
      const response = await fetch(`${API_BASE_URL}/files/data`);
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async getFile(fileName) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/files/data/detail?fileName=${fileName}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default FileController;
