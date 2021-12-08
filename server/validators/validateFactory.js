// Usando el patron factoru para la creacion de middlewares de validación
const Validator =
  ({ shape, getObject }) =>
  async (req, res, next) => {
    // construyendo el objeto validador
    const dataObject = getObject(req);
    // Realizar Validación
    try {
      // Se valida objeto
      const validData = await shape.validate(dataObject);
      // Inyectar objeto validado a peticion
      req.validData = validData;
      // Se invoca siguiente middleware de cadena
      return next();
    } catch (error) {
      console.log(`Error al momento de validar: ${dataObject}`);
      return res.status(400).json({ error: error.message });
    }
  };

// Eportando validador
export default Validator;
