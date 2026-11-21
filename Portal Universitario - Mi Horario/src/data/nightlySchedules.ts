import { DayOfWeek, ScheduleEntry } from '../types/portal';

type RawTuple = [
  group: string,
  day: DayOfWeek,
  blockCode: string,
  classroomCode: string,
  subjectName: string,
  professor: string
];

const RAW_NIGHTLY_SCHEDULES: RawTuple[] = [
  // =====================================================
  // 1. LRI 6-N (Salón 853)
  // =====================================================
  ['LRI 6-N', 'Lunes', 'N1', '853', 'Inglés para Negocios I LRI 6', '519. Hernández Ordoñez Saira Yamileth'],
  ['LRI 6-N', 'Lunes', 'N2', '853', 'Desarrollo Emprendedor LRI 6', '299. Renovato Cruz Jorge Alberto'],
  ['LRI 6-N', 'Lunes', 'N3', '853', 'Teorías de Liderazgo LRI 6', '510. Beltrán Moreno Obet'],
  ['LRI 6-N', 'Lunes', 'N4', '853', 'Geografía Económica Regional LRI 6', '163. Martínez Moreno Fabiola'],
  ['LRI 6-N', 'Lunes', 'N5', '853', 'Geografía Económica Regional LRI 6', '163. Martínez Moreno Fabiola'],
  ['LRI 6-N', 'Lunes', 'N6', '853', 'Teorías Generales de las Relaciones Internacionales LRI 6', 'González Parra Cristian Asael'],
  ['LRI 6-N', 'Martes', 'N1', '853', 'Teorías Generales de las Relaciones Internacionales LRI 6', 'González Parra Cristian Asael'],
  ['LRI 6-N', 'Martes', 'N2', '853', 'Teorías Generales de las Relaciones Internacionales LRI 6', 'González Parra Cristian Asael'],
  ['LRI 6-N', 'Martes', 'N3', '853', 'Relaciones Diplomáticas y Políticas LRI 6', '53. Aponte Guzmán Laura Olivia'],
  ['LRI 6-N', 'Martes', 'N4', '853', 'Relaciones Diplomáticas y Políticas LRI 6', '53. Aponte Guzmán Laura Olivia'],
  ['LRI 6-N', 'Martes', 'N5', '853', 'Teorías de Liderazgo LRI 6', '510. Beltrán Moreno Obet'],
  ['LRI 6-N', 'Martes', 'N6', '853', 'Teorías de Liderazgo LRI 6', '510. Beltrán Moreno Obet'],
  ['LRI 6-N', 'Miércoles', 'N1', '853', 'Inglés para Negocios I LRI 6', '519. Hernández Ordoñez Saira Yamileth'],
  ['LRI 6-N', 'Miércoles', 'N2', '853', 'Inglés para Negocios I LRI 6', '519. Hernández Ordoñez Saira Yamileth'],
  ['LRI 6-N', 'Miércoles', 'N3', '853', 'Geografía Económica Regional LRI 6', '163. Martínez Moreno Fabiola'],
  ['LRI 6-N', 'Miércoles', 'N4', '853', 'Relaciones Diplomáticas y Políticas LRI 6', '53. Aponte Guzmán Laura Olivia'],
  ['LRI 6-N', 'Miércoles', 'N5', '853', 'Desarrollo Emprendedor LRI 6', '299. Renovato Cruz Jorge Alberto'],
  ['LRI 6-N', 'Miércoles', 'N6', '853', 'Desarrollo Emprendedor LRI 6', '299. Renovato Cruz Jorge Alberto'],

  // =====================================================
  // 2. LRI 7-N (Salón 852)
  // =====================================================
  ['LRI 7-N', 'Lunes', 'N2', '852', 'Medios de Transporte Internacional LRI 7', 'González Parra Cristian Asael'],
  ['LRI 7-N', 'Lunes', 'N3', '852', 'Migraciones Internacionales LRI 7', '163. Martínez Moreno Fabiola'],
  ['LRI 7-N', 'Lunes', 'N4', '852', 'Inglés para Negocios II LRI 7', '519. Hernández Ordoñez Saira Yamileth'],
  ['LRI 7-N', 'Lunes', 'N5', '852', 'Medios de Transporte Internacional LRI 7', 'González Parra Cristian Asael'],
  ['LRI 7-N', 'Martes', 'N2', '852', 'Derecho Internacional de Negocios LRI 7', '10. Díaz Zorola Francisco Alfredo'],
  ['LRI 7-N', 'Martes', 'N3', '852', 'Administración Internacional LRI 7', '326. Leyva Salas Carlos Martín'],
  ['LRI 7-N', 'Martes', 'N4', '852', 'Instituciones Internacionales LRI 7', '564. Soto Rodríguez Jorge'],
  ['LRI 7-N', 'Martes', 'N5', '852', 'Administración Internacional LRI 7', '326. Leyva Salas Carlos Martín'],
  ['LRI 7-N', 'Miércoles', 'N1', '852', 'Migraciones Internacionales LRI 7', '163. Martínez Moreno Fabiola'],
  ['LRI 7-N', 'Miércoles', 'N2', '852', 'Migraciones Internacionales LRI 7', '163. Martínez Moreno Fabiola'],
  ['LRI 7-N', 'Miércoles', 'N3', '852', 'Inglés para Negocios II LRI 7', '519. Hernández Ordoñez Saira Yamileth'],
  ['LRI 7-N', 'Miércoles', 'N4', '852', 'Inglés para Negocios II LRI 7', '519. Hernández Ordoñez Saira Yamileth'],
  ['LRI 7-N', 'Miércoles', 'N5', '852', 'Instituciones Internacionales LRI 7', '564. Soto Rodríguez Jorge'],
  ['LRI 7-N', 'Jueves', 'N1', '852', 'Medios de Transporte Internacional LRI 7', 'González Parra Cristian Asael'],
  ['LRI 7-N', 'Jueves', 'N2', '852', 'Instituciones Internacionales LRI 7', '564. Soto Rodríguez Jorge'],
  ['LRI 7-N', 'Jueves', 'N3', '852', 'Administración Internacional LRI 7', '326. Leyva Salas Carlos Martín'],
  ['LRI 7-N', 'Jueves', 'N4', '852', 'Derecho Internacional de Negocios LRI 7', '10. Díaz Zorola Francisco Alfredo'],
  ['LRI 7-N', 'Jueves', 'N5', '852', 'Derecho Internacional de Negocios LRI 7', '10. Díaz Zorola Francisco Alfredo'],

  // =====================================================
  // 3. LRI 8-N (Salón 851)
  // =====================================================
  ['LRI 8-N', 'Lunes', 'N1', '851', 'Negocios Internacionales LRI 8', 'González Parra Cristian Asael'],
  ['LRI 8-N', 'Lunes', 'N2', '851', 'Seminario de Consultoría LRI 8', '396. García Suárez Yessica Yazmín'],
  ['LRI 8-N', 'Lunes', 'N3', '851', 'Negocios Internacionales LRI 8', 'González Parra Cristian Asael'],
  ['LRI 8-N', 'Lunes', 'N4', '851', 'Negocios Internacionales LRI 8', 'González Parra Cristian Asael'],
  ['LRI 8-N', 'Martes', 'N1', '851', 'Solución de Conflictos Internacionales LRI 8', '53. Aponte Guzmán Laura Olivia'],
  ['LRI 8-N', 'Martes', 'N2', '851', 'Solución de Conflictos Internacionales LRI 8', '53. Aponte Guzmán Laura Olivia'],
  ['LRI 8-N', 'Martes', 'N3', '851', 'Tratados Comerciales Internacionales de México LRI 8', '510. Beltrán Moreno Obet'],
  ['LRI 8-N', 'Martes', 'N4', '851', 'Instituciones Financieras Internacionales LRI 8', '326. Leyva Salas Carlos Martín'],
  ['LRI 8-N', 'Martes', 'N5', '851', 'Cooperación Internacional LRI 8', 'González Parra Cristian Asael'],
  ['LRI 8-N', 'Martes', 'N6', '851', 'Cooperación Internacional LRI 8', 'González Parra Cristian Asael'],
  ['LRI 8-N', 'Miércoles', 'N1', '851', 'Cooperación Internacional LRI 8', 'González Parra Cristian Asael'],
  ['LRI 8-N', 'Miércoles', 'N2', '851', 'Solución de Conflictos Internacionales LRI 8', '53. Aponte Guzmán Laura Olivia'],
  ['LRI 8-N', 'Miércoles', 'N3', '851', 'Tratados Comerciales Internacionales de México LRI 8', '510. Beltrán Moreno Obet'],
  ['LRI 8-N', 'Miércoles', 'N4', '851', 'Tratados Comerciales Internacionales de México LRI 8', '510. Beltrán Moreno Obet'],
  ['LRI 8-N', 'Jueves', 'N3', '851', 'Seminario de Consultoría LRI 8', '396. García Suárez Yessica Yazmín'],
  ['LRI 8-N', 'Jueves', 'N4', '851', 'Seminario de Consultoría LRI 8', '396. García Suárez Yessica Yazmín'],
  ['LRI 8-N', 'Jueves', 'N5', '851', 'Instituciones Financieras Internacionales LRI 8', '326. Leyva Salas Carlos Martín'],
  ['LRI 8-N', 'Jueves', 'N6', '851', 'Instituciones Financieras Internacionales LRI 8', '326. Leyva Salas Carlos Martín'],

  // =====================================================
  // 4. LAE 4-N (Salón 843)
  // =====================================================
  ['LAE 4-N', 'Lunes', 'N4', '843', 'Contabilidad Financiera LAE 4', '478. Estrella Gómez Karla Yadira'],
  ['LAE 4-N', 'Lunes', 'N5', '843', 'Contabilidad Financiera LAE 4', '478. Estrella Gómez Karla Yadira'],
  ['LAE 4-N', 'Lunes', 'N6', '843', 'Microeconomía LAE 4', '564. Soto Rodríguez Jorge'],
  ['LAE 4-N', 'Martes', 'N1', '843', 'Fundamentos del Derecho Mercantil LAE 4', '10. Díaz Zorola Francisco Alfredo'],
  ['LAE 4-N', 'Martes', 'N2', '843', 'Contabilidad Financiera LAE 4', '478. Estrella Gómez Karla Yadira'],
  ['LAE 4-N', 'Martes', 'N3', '843', 'Microeconomía LAE 4', '564. Soto Rodríguez Jorge'],
  ['LAE 4-N', 'Martes', 'N4', '843', 'Inglés IV LAE 4', '395. Armijo Vega Fernando Alberto'],
  ['LAE 4-N', 'Martes', 'N5', '843', 'Inglés IV LAE 4', '395. Armijo Vega Fernando Alberto'],
  ['LAE 4-N', 'Miércoles', 'N1', '843', 'Fundamentos del Derecho Mercantil LAE 4', '10. Díaz Zorola Francisco Alfredo'],
  ['LAE 4-N', 'Miércoles', 'N2', '843', 'Inglés IV LAE 4', '395. Armijo Vega Fernando Alberto'],
  ['LAE 4-N', 'Miércoles', 'N3', '843', 'Ventas LAE 4', '438. Aranda Téllez Ruth'],
  ['LAE 4-N', 'Miércoles', 'N4', '843', 'Ventas LAE 4', '438. Aranda Téllez Ruth'],
  ['LAE 4-N', 'Miércoles', 'N5', '843', 'Globalización LAE 4', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 4-N', 'Jueves', 'N2', '843', 'Fundamentos del Derecho Mercantil LAE 4', '10. Díaz Zorola Francisco Alfredo'],
  ['LAE 4-N', 'Jueves', 'N3', '843', 'Ventas LAE 4', '438. Aranda Téllez Ruth'],
  ['LAE 4-N', 'Jueves', 'N4', '843', 'Microeconomía LAE 4', '564. Soto Rodríguez Jorge'],
  ['LAE 4-N', 'Jueves', 'N5', '843', 'Globalización LAE 4', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 4-N', 'Jueves', 'N6', '843', 'Globalización LAE 4', '772. Escobedo Martínez Samuel Ricardo'],

  // =====================================================
  // 5. LAE 6-N (Salones 812, 833, 746, 853)
  // =====================================================
  ['LAE 6-N', 'Lunes', 'N1', '812', 'Investigación de Mercados LAE 6', '396. García Suárez Yessica Yazmín'],
  ['LAE 6-N', 'Lunes', 'N2', '833', 'Relaciones Laborales y Política Empresarial LAE 6', '53. Aponte Guzmán Laura Olivia'],
  ['LAE 6-N', 'Lunes', 'N3', '833', 'Relaciones Laborales y Política Empresarial LAE 6', '53. Aponte Guzmán Laura Olivia'],
  ['LAE 6-N', 'Lunes', 'N4', '833', 'Administración Internacional LAE 6', '564. Soto Rodríguez Jorge'],
  ['LAE 6-N', 'Lunes', 'N5', '833', 'Administración Internacional LAE 6', '564. Soto Rodríguez Jorge'],
  ['LAE 6-N', 'Lunes', 'N6', '833', 'Análisis de Estados Financieros LAE 6', '478. Estrella Gómez Karla Yadira'],
  ['LAE 6-N', 'Martes', 'N1', '746', 'Desarrollo Emprendedor LAE 6', '396. García Suárez Yessica Yazmín'],
  ['LAE 6-N', 'Martes', 'N2', '746', 'Administración de Recursos Humanos LAE 6', '416. Caballero Ortega Jaime'],
  ['LAE 6-N', 'Martes', 'N3', '746', 'Análisis de Estados Financieros LAE 6', '478. Estrella Gómez Karla Yadira'],
  ['LAE 6-N', 'Martes', 'N4', '746', 'Análisis de Estados Financieros LAE 6', '478. Estrella Gómez Karla Yadira'],
  ['LAE 6-N', 'Martes', 'N5', '746', 'Administración Internacional LAE 6', '564. Soto Rodríguez Jorge'],
  ['LAE 6-N', 'Martes', 'N6', '746', 'Relaciones Laborales y Política Empresarial LAE 6', '53. Aponte Guzmán Laura Olivia'],
  ['LAE 6-N', 'Viernes', 'N1', '833', 'Desarrollo Emprendedor LAE 6', '396. García Suárez Yessica Yazmín'],
  ['LAE 6-N', 'Viernes', 'N2', '812', 'Administración de Recursos Humanos LAE 6', '416. Caballero Ortega Jaime'],
  ['LAE 6-N', 'Viernes', 'N3', '812', 'Administración de Recursos Humanos LAE 6', '416. Caballero Ortega Jaime'],
  ['LAE 6-N', 'Viernes', 'N4', '812', 'Desarrollo Emprendedor LAE 6', '396. García Suárez Yessica Yazmín'],
  ['LAE 6-N', 'Viernes', 'N5', '812', 'Investigación de Mercados LAE 6', '396. García Suárez Yessica Yazmín'],
  ['LAE 6-N', 'Viernes', 'N6', '853', 'Investigación de Mercados LAE 6', '396. García Suárez Yessica Yazmín'],

  // =====================================================
  // 6. LAE 7-N (Salones 811, 733)
  // =====================================================
  ['LAE 7-N', 'Lunes', 'N1', '811', 'Presupuestos LAE 7', '478. Estrella Gómez Karla Yadira'],
  ['LAE 7-N', 'Lunes', 'N2', '811', 'Sistema Bancario y Financiero LAE 7', '478. Estrella Gómez Karla Yadira'],
  ['LAE 7-N', 'Lunes', 'N3', '811', 'Presupuestos LAE 7', '478. Estrella Gómez Karla Yadira'],
  ['LAE 7-N', 'Lunes', 'N4', '811', 'Análisis del Consumidor LAE 7', '396. García Suárez Yessica Yazmín'],
  ['LAE 7-N', 'Lunes', 'N5', '811', 'Análisis del Consumidor LAE 7', '396. García Suárez Yessica Yazmín'],
  ['LAE 7-N', 'Lunes', 'N6', '811', 'Análisis del Consumidor LAE 7', '396. García Suárez Yessica Yazmín'],
  ['LAE 7-N', 'Martes', 'N1', '733', 'Presupuestos LAE 7', '478. Estrella Gómez Karla Yadira'],
  ['LAE 7-N', 'Martes', 'N2', '733', 'Tendencias de la Administración Estratégica LAE 7', '438. Aranda Téllez Ruth'],
  ['LAE 7-N', 'Martes', 'N3', '733', 'Tendencias de la Administración Estratégica LAE 7', '438. Aranda Téllez Ruth'],
  ['LAE 7-N', 'Martes', 'N4', '733', 'Desarrollo Organizacional LAE 7', '438. Aranda Téllez Ruth'],
  ['LAE 7-N', 'Martes', 'N5', '733', 'Sistema Bancario y Financiero LAE 7', '478. Estrella Gómez Karla Yadira'],
  ['LAE 7-N', 'Martes', 'N6', '733', 'Sistema Bancario y Financiero LAE 7', '478. Estrella Gómez Karla Yadira'],
  ['LAE 7-N', 'Jueves', 'N1', '811', 'Desarrollo Organizacional LAE 7', '438. Aranda Téllez Ruth'],
  ['LAE 7-N', 'Jueves', 'N2', '811', 'Tendencias de la Administración Estratégica LAE 7', '438. Aranda Téllez Ruth'],
  ['LAE 7-N', 'Jueves', 'N3', '811', 'Psicología Aplicada a las Organizaciones LAE 7', '141. Morales Rodríguez Teresa de Jesús'],
  ['LAE 7-N', 'Jueves', 'N4', '811', 'Psicología Aplicada a las Organizaciones LAE 7', '141. Morales Rodríguez Teresa de Jesús'],
  ['LAE 7-N', 'Jueves', 'N5', '811', 'Desarrollo Organizacional LAE 7', '438. Aranda Téllez Ruth'],
  ['LAE 7-N', 'Jueves', 'N6', '811', 'Psicología Aplicada a las Organizaciones LAE 7', '141. Morales Rodríguez Teresa de Jesús'],

  // =====================================================
  // 7. LAE 8-N (Salón 842)
  // =====================================================
  ['LAE 8-N', 'Lunes', 'N1', '842', 'Administración de Créditos y Cobranza LAE 8', '87. Campos González Juan'],
  ['LAE 8-N', 'Lunes', 'N2', '842', 'Administración de Créditos y Cobranza LAE 8', '87. Campos González Juan'],
  ['LAE 8-N', 'Lunes', 'N3', '842', 'Administración de la Calidad LAE 8', '458. Andrade Rivas Irasema'],
  ['LAE 8-N', 'Lunes', 'N4', '842', 'Administración de la Calidad LAE 8', '458. Andrade Rivas Irasema'],
  ['LAE 8-N', 'Martes', 'N1', '842', 'Seminario de Recursos Humanos y Relaciones Laborales LAE 8', '438. Aranda Téllez Ruth'],
  ['LAE 8-N', 'Martes', 'N2', '842', 'Administración de Ventas LAE 8', 'Charles Quintero Brandi Sabrina'],
  ['LAE 8-N', 'Martes', 'N3', '842', 'Administración de Ventas LAE 8', 'Charles Quintero Brandi Sabrina'],
  ['LAE 8-N', 'Martes', 'N4', '842', 'Administración de Operaciones LAE 8', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 8-N', 'Martes', 'N5', '842', 'Seminario de Recursos Humanos y Relaciones Laborales LAE 8', '438. Aranda Téllez Ruth'],
  ['LAE 8-N', 'Miércoles', 'N2', '842', 'Administración de la Calidad LAE 8', '458. Andrade Rivas Irasema'],
  ['LAE 8-N', 'Miércoles', 'N3', '842', 'Administración de la Producción LAE 8', '501. Soto Castellanos Axel Eduardo'],
  ['LAE 8-N', 'Miércoles', 'N4', '842', 'Administración de Operaciones LAE 8', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 8-N', 'Miércoles', 'N5', '842', 'Seminario de Recursos Humanos y Relaciones Laborales LAE 8', '438. Aranda Téllez Ruth'],
  ['LAE 8-N', 'Miércoles', 'N6', '842', 'Administración de Créditos y Cobranza LAE 8', '87. Campos González Juan'],
  ['LAE 8-N', 'Jueves', 'N3', '842', 'Administración de Ventas LAE 8', 'Charles Quintero Brandi Sabrina'],
  ['LAE 8-N', 'Jueves', 'N4', '842', 'Administración de Operaciones LAE 8', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 8-N', 'Jueves', 'N5', '842', 'Administración de la Producción LAE 8', '501. Soto Castellanos Axel Eduardo'],
  ['LAE 8-N', 'Jueves', 'N6', '842', 'Administración de la Producción LAE 8', '501. Soto Castellanos Axel Eduardo'],

  // =====================================================
  // 8. LAE 9-N (Salón 833)
  // =====================================================
  ['LAE 9-N', 'Martes', 'N1', '833', 'Seminario de Proyectos de Negociación LAE 9', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 9-N', 'Martes', 'N2', '833', 'Administración de Compras LAE 9', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 9-N', 'Martes', 'N3', '833', 'Seminario de Negociación LAE 9', '10. Díaz Zorola Francisco Alfredo'],
  ['LAE 9-N', 'Martes', 'N4', '833', 'Auditoría Administrativa LAE 9', '100. Zamarripa Mata Santiago'],
  ['LAE 9-N', 'Martes', 'N5', '833', 'Seminario de Consultoría LAE 9', '396. García Suárez Yessica Yazmín'],
  ['LAE 9-N', 'Martes', 'N6', '833', 'Seminario de Consultoría LAE 9', '396. García Suárez Yessica Yazmín'],
  ['LAE 9-N', 'Miércoles', 'N1', '833', 'Seminario de Consultoría LAE 9', '396. García Suárez Yessica Yazmín'],
  ['LAE 9-N', 'Miércoles', 'N2', '833', 'Seminario de Negociación LAE 9', '10. Díaz Zorola Francisco Alfredo'],
  ['LAE 9-N', 'Miércoles', 'N3', '833', 'Seminario de Proyectos de Negociación LAE 9', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 9-N', 'Miércoles', 'N4', '833', 'Elaboración y Evaluación de Proyectos de Inversión LAE 9', '564. Soto Rodríguez Jorge'],
  ['LAE 9-N', 'Miércoles', 'N5', '833', 'Seminario de Negociación LAE 9', '10. Díaz Zorola Francisco Alfredo'],
  ['LAE 9-N', 'Miércoles', 'N6', '833', 'Administración de Compras LAE 9', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 9-N', 'Jueves', 'N1', '833', 'Seminario de Proyectos de Negociación LAE 9', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 9-N', 'Jueves', 'N2', '833', 'Administración de Compras LAE 9', '772. Escobedo Martínez Samuel Ricardo'],
  ['LAE 9-N', 'Jueves', 'N3', '833', 'Auditoría Administrativa LAE 9', '100. Zamarripa Mata Santiago'],
  ['LAE 9-N', 'Jueves', 'N4', '833', 'Auditoría Administrativa LAE 9', '100. Zamarripa Mata Santiago'],
  ['LAE 9-N', 'Jueves', 'N5', '833', 'Elaboración y Evaluación de Proyectos de Inversión LAE 9', '564. Soto Rodríguez Jorge'],
  ['LAE 9-N', 'Jueves', 'N6', '833', 'Elaboración y Evaluación de Proyectos de Inversión LAE 9', '564. Soto Rodríguez Jorge'],

  // =====================================================
  // 9. CPA 6-N (Salón 832)
  // =====================================================
  ['CPA 6-N', 'Martes', 'N2', '832', 'Auditoría II (Control Interno) CPA 6', '191. Cerda Mendoza Nohemí'],
  ['CPA 6-N', 'Martes', 'N3', '832', 'Impuestos I (Código Fiscal de la Federación) CPA 6', '100. Zamarripa Mata Santiago'],
  ['CPA 6-N', 'Martes', 'N4', '832', 'Desarrollo Emprendedor CPA 6', '396. García Suárez Yessica Yazmín'],
  ['CPA 6-N', 'Miércoles', 'N1', '832', 'Crédito y Cobranza CPA 6', '87. Campos González Juan'],
  ['CPA 6-N', 'Miércoles', 'N2', '832', 'Finanzas I (Análisis de Estados Financieros) CPA 6', '564. Soto Rodríguez Jorge'],
  ['CPA 6-N', 'Miércoles', 'N3', '832', 'Finanzas I (Análisis de Estados Financieros) CPA 6', '564. Soto Rodríguez Jorge'],
  ['CPA 6-N', 'Miércoles', 'N4', '832', 'Crédito y Cobranza CPA 6', '87. Campos González Juan'],
  ['CPA 6-N', 'Miércoles', 'N5', '832', 'Crédito y Cobranza CPA 6', '87. Campos González Juan'],
  ['CPA 6-N', 'Miércoles', 'N6', '832', 'Desarrollo Emprendedor CPA 6', '396. García Suárez Yessica Yazmín'],
  ['CPA 6-N', 'Jueves', 'N1', '832', 'Impuestos I (Código Fiscal de la Federación) CPA 6', '100. Zamarripa Mata Santiago'],
  ['CPA 6-N', 'Jueves', 'N2', '832', 'Impuestos I (Código Fiscal de la Federación) CPA 6', '100. Zamarripa Mata Santiago'],
  ['CPA 6-N', 'Jueves', 'N3', '832', 'Finanzas I (Análisis de Estados Financieros) CPA 6', '564. Soto Rodríguez Jorge'],
  ['CPA 6-N', 'Jueves', 'N4', '832', 'Auditoría II (Control Interno) CPA 6', '191. Cerda Mendoza Nohemí'],
  ['CPA 6-N', 'Jueves', 'N5', '832', 'Presupuestos CPA 6', '100. Zamarripa Mata Santiago'],
  ['CPA 6-N', 'Viernes', 'N2', '832', 'Desarrollo Emprendedor CPA 6', '396. García Suárez Yessica Yazmín'],
  ['CPA 6-N', 'Viernes', 'N3', '832', 'Auditoría II (Control Interno) CPA 6', '191. Cerda Mendoza Nohemí'],
  ['CPA 6-N', 'Viernes', 'N4', '832', 'Presupuestos CPA 6', '100. Zamarripa Mata Santiago'],
  ['CPA 6-N', 'Viernes', 'N5', '832', 'Presupuestos CPA 6', '100. Zamarripa Mata Santiago'],

  // =====================================================
  // 10. CPA 7-N (Salón 813)
  // =====================================================
  ['CPA 7-N', 'Lunes', 'N3', '813', 'Normas Internacionales de Información Financiera CPA 7', '87. Campos González Juan'],
  ['CPA 7-N', 'Lunes', 'N4', '813', 'Ética en las Organizaciones CPA 7', '510. Beltrán Moreno Obet'],
  ['CPA 7-N', 'Lunes', 'N5', '813', 'Impuestos II (Ley del ISR Personas Morales) CPA 7', '326. Leyva Salas Carlos Martín'],
  ['CPA 7-N', 'Lunes', 'N6', '813', 'Impuestos II (Ley del ISR Personas Morales) CPA 7', '326. Leyva Salas Carlos Martín'],
  ['CPA 7-N', 'Martes', 'N2', '813', 'Ética en las Organizaciones CPA 7', '510. Beltrán Moreno Obet'],
  ['CPA 7-N', 'Martes', 'N3', '813', 'Metodología de la Investigación CPA 7', '396. García Suárez Yessica Yazmín'],
  ['CPA 7-N', 'Martes', 'N4', '813', 'Ética en las Organizaciones CPA 7', '510. Beltrán Moreno Obet'],
  ['CPA 7-N', 'Martes', 'N5', '813', 'Auditoría III (Práctica de Auditoría) CPA 7', '279. González Hurtado Rosa Isela'],
  ['CPA 7-N', 'Martes', 'N6', '813', 'Finanzas II (Sistema Bancario y Financiero) CPA 7', '564. Soto Rodríguez Jorge'],
  ['CPA 7-N', 'Miércoles', 'N1', '813', 'Finanzas II (Sistema Bancario y Financiero) CPA 7', '564. Soto Rodríguez Jorge'],
  ['CPA 7-N', 'Miércoles', 'N2', '813', 'Normas Internacionales de Información Financiera CPA 7', '87. Campos González Juan'],
  ['CPA 7-N', 'Miércoles', 'N3', '813', 'Normas Internacionales de Información Financiera CPA 7', '87. Campos González Juan'],
  ['CPA 7-N', 'Miércoles', 'N4', '813', 'Metodología de la Investigación CPA 7', '396. García Suárez Yessica Yazmín'],
  ['CPA 7-N', 'Miércoles', 'N5', '813', 'Metodología de la Investigación CPA 7', '396. García Suárez Yessica Yazmín'],
  ['CPA 7-N', 'Miércoles', 'N6', '813', 'Impuestos II (Ley del ISR Personas Morales) CPA 7', '326. Leyva Salas Carlos Martín'],
  ['CPA 7-N', 'Jueves', 'N1', '813', 'Finanzas II (Sistema Bancario y Financiero) CPA 7', '564. Soto Rodríguez Jorge'],
  ['CPA 7-N', 'Jueves', 'N2', '813', 'Auditoría III (Práctica de Auditoría) CPA 7', '279. González Hurtado Rosa Isela'],
  ['CPA 7-N', 'Jueves', 'N3', '813', 'Auditoría III (Práctica de Auditoría) CPA 7', '279. González Hurtado Rosa Isela'],

  // =====================================================
  // 11. CPA 8-N (Salón 812)
  // =====================================================
  ['CPA 8-N', 'Lunes', 'N2', '812', 'Finanzas II (Finanzas Corporativas) CPA 8', '564. Soto Rodríguez Jorge'],
  ['CPA 8-N', 'Lunes', 'N3', '812', 'Finanzas II (Finanzas Corporativas) CPA 8', '564. Soto Rodríguez Jorge'],
  ['CPA 8-N', 'Lunes', 'N4', '812', 'Impuestos III (Ley del ISR Personas Físicas) CPA 8', '326. Leyva Salas Carlos Martín'],
  ['CPA 8-N', 'Lunes', 'N5', '812', 'Liderazgo CPA 8', '510. Beltrán Moreno Obet'],
  ['CPA 8-N', 'Lunes', 'N6', '812', 'Liderazgo CPA 8', '510. Beltrán Moreno Obet'],
  ['CPA 8-N', 'Martes', 'N1', '812', 'Finanzas II (Finanzas Corporativas) CPA 8', '564. Soto Rodríguez Jorge'],
  ['CPA 8-N', 'Martes', 'N2', '812', 'Seminario de Consultoría CPA 8', '396. García Suárez Yessica Yazmín'],
  ['CPA 8-N', 'Martes', 'N3', '812', 'Contribuciones de Seguridad Social CPA 8', '279. González Hurtado Rosa Isela'],
  ['CPA 8-N', 'Martes', 'N4', '812', 'Contribuciones de Seguridad Social CPA 8', '279. González Hurtado Rosa Isela'],
  ['CPA 8-N', 'Miércoles', 'N2', '812', 'Auditoría IV (Dictámenes Especiales) CPA 8', '191. Cerda Mendoza Nohemí'],
  ['CPA 8-N', 'Miércoles', 'N3', '812', 'Seminario de Consultoría CPA 8', '396. García Suárez Yessica Yazmín'],
  ['CPA 8-N', 'Miércoles', 'N4', '812', 'Impuestos III (Ley del ISR Personas Físicas) CPA 8', '326. Leyva Salas Carlos Martín'],
  ['CPA 8-N', 'Miércoles', 'N5', '812', 'Impuestos III (Ley del ISR Personas Físicas) CPA 8', '326. Leyva Salas Carlos Martín'],
  ['CPA 8-N', 'Miércoles', 'N6', '812', 'Liderazgo CPA 8', '510. Beltrán Moreno Obet'],
  ['CPA 8-N', 'Jueves', 'N2', '812', 'Auditoría IV (Dictámenes Especiales) CPA 8', '191. Cerda Mendoza Nohemí'],
  ['CPA 8-N', 'Jueves', 'N3', '812', 'Auditoría IV (Dictámenes Especiales) CPA 8', '191. Cerda Mendoza Nohemí'],
  ['CPA 8-N', 'Jueves', 'N4', '812', 'Contribuciones de Seguridad Social CPA 8', '279. González Hurtado Rosa Isela'],
  ['CPA 8-N', 'Jueves', 'N5', '812', 'Seminario de Consultoría CPA 8', '396. García Suárez Yessica Yazmín'],

  // =====================================================
  // 12. CPA 9-N (Salones 832, 811)
  // =====================================================
  ['CPA 9-N', 'Lunes', 'N2', '832', 'Auditoría V (Auditoría Interna) CPA 9', '191. Cerda Mendoza Nohemí'],
  ['CPA 9-N', 'Lunes', 'N3', '832', 'Finanzas IV (Elaboración de Proyectos de Inversión) CPA 9', '191. Cerda Mendoza Nohemí'],
  ['CPA 9-N', 'Lunes', 'N4', '832', 'Finanzas IV (Elaboración de Proyectos de Inversión) CPA 9', '191. Cerda Mendoza Nohemí'],
  ['CPA 9-N', 'Lunes', 'N5', '832', 'Seminario de Responsabilidad Social CPA 9', '381. Cano López José Gustavo'],
  ['CPA 9-N', 'Lunes', 'N6', '832', 'Seminario de Responsabilidad Social CPA 9', '381. Cano López José Gustavo'],
  ['CPA 9-N', 'Martes', 'N1', '811', 'Impuestos IV (Ley de IVA y del IEPS) CPA 9', '100. Zamarripa Mata Santiago'],
  ['CPA 9-N', 'Martes', 'N2', '811', 'Impuestos IV (Ley de IVA y del IEPS) CPA 9', '100. Zamarripa Mata Santiago'],
  ['CPA 9-N', 'Martes', 'N3', '811', 'Auditoría V (Auditoría Interna) CPA 9', '191. Cerda Mendoza Nohemí'],
  ['CPA 9-N', 'Martes', 'N4', '811', 'Seminario de Negociación CPA 9', '10. Díaz Zorola Francisco Alfredo'],
  ['CPA 9-N', 'Martes', 'N5', '811', 'Seminario de Contraloría CPA 9', '416. Caballero Ortega Jaime'],
  ['CPA 9-N', 'Martes', 'N6', '811', 'Seminario de Responsabilidad Social CPA 9', '381. Cano López José Gustavo'],
  ['CPA 9-N', 'Miércoles', 'N3', '811', 'Seminario de Negociación CPA 9', '10. Díaz Zorola Francisco Alfredo'],
  ['CPA 9-N', 'Miércoles', 'N4', '811', 'Seminario de Negociación CPA 9', '10. Díaz Zorola Francisco Alfredo'],
  ['CPA 9-N', 'Miércoles', 'N5', '811', 'Finanzas IV (Elaboración de Proyectos de Inversión) CPA 9', '191. Cerda Mendoza Nohemí'],
  ['CPA 9-N', 'Miércoles', 'N6', '811', 'Auditoría V (Auditoría Interna) CPA 9', '191. Cerda Mendoza Nohemí'],
  ['CPA 9-N', 'Viernes', 'N4', '811', 'Seminario de Contraloría CPA 9', '416. Caballero Ortega Jaime'],
  ['CPA 9-N', 'Viernes', 'N5', '811', 'Seminario de Contraloría CPA 9', '416. Caballero Ortega Jaime'],
  ['CPA 9-N', 'Viernes', 'N6', '811', 'Impuestos IV (Ley de IVA y del IEPS) CPA 9', '100. Zamarripa Mata Santiago'],

  // =====================================================
  // 13. LPYN 4-N (Salón 742)
  // =====================================================
  ['LPYN 4-N', 'Lunes', 'N1', '742', 'Neuroanatomía LPYN 4', '596. Morales Aguirre Mario'],
  ['LPYN 4-N', 'Lunes', 'N2', '742', 'Neuroanatomía LPYN 4', '596. Morales Aguirre Mario'],
  ['LPYN 4-N', 'Lunes', 'N3', '742', 'Inglés IV LPYN 4', '519. Hernández Ordoñez Saira Yamileth'],
  ['LPYN 4-N', 'Lunes', 'N4', '742', 'Nutrición y Neuronutrición LPYN 4', '596. Morales Aguirre Mario'],
  ['LPYN 4-N', 'Lunes', 'N5', '742', 'Psicología de la Adolescencia LPYN 4', '213. Hernández Pascual Ericka'],
  ['LPYN 4-N', 'Lunes', 'N6', '742', 'Psicología de la Adolescencia LPYN 4', '213. Hernández Pascual Ericka'],
  ['LPYN 4-N', 'Martes', 'N1', '742', 'Teoría y Técnica de la Entrevista LPYN 4', '523. Medina Gastelum Roxana'],
  ['LPYN 4-N', 'Martes', 'N2', '742', 'Psicología de la Adolescencia LPYN 4', '213. Hernández Pascual Ericka'],
  ['LPYN 4-N', 'Martes', 'N3', '742', 'Nutrición y Neuronutrición LPYN 4', '596. Morales Aguirre Mario'],
  ['LPYN 4-N', 'Martes', 'N4', '742', 'Neuroanatomía LPYN 4', '596. Morales Aguirre Mario'],
  ['LPYN 4-N', 'Martes', 'N5', '742', 'Grupos Operativos LPYN 4', '452. Cano Balboa Gabriela'],
  ['LPYN 4-N', 'Martes', 'N6', '742', 'Grupos Operativos LPYN 4', '452. Cano Balboa Gabriela'],
  ['LPYN 4-N', 'Miércoles', 'N1', '742', 'Teoría y Práctica de Terapias Alternativas LPYN 4', '381. Cano López José Gustavo'],
  ['LPYN 4-N', 'Miércoles', 'N2', '742', 'Nutrición y Neuronutrición LPYN 4', '596. Morales Aguirre Mario'],
  ['LPYN 4-N', 'Miércoles', 'N3', '742', 'Teoría y Técnica de la Entrevista LPYN 4', '523. Medina Gastelum Roxana'],
  ['LPYN 4-N', 'Miércoles', 'N4', '742', 'Teoría y Técnica de la Entrevista LPYN 4', '523. Medina Gastelum Roxana'],
  ['LPYN 4-N', 'Miércoles', 'N5', '742', 'Inglés IV LPYN 4', '519. Hernández Ordoñez Saira Yamileth'],
  ['LPYN 4-N', 'Miércoles', 'N6', '742', 'Inglés IV LPYN 4', '519. Hernández Ordoñez Saira Yamileth'],
  ['LPYN 4-N', 'Jueves', 'N1', '742', 'Teoría y Práctica de Terapias Alternativas LPYN 4', '381. Cano López José Gustavo'],
  ['LPYN 4-N', 'Jueves', 'N2', '742', 'Teoría y Práctica de Terapias Alternativas LPYN 4', '381. Cano López José Gustavo'],
  ['LPYN 4-N', 'Jueves', 'N3', '742', 'Grupos Operativos LPYN 4', '452. Cano Balboa Gabriela'],
  ['LPYN 4-N', 'Jueves', 'N4', '742', 'Metodología de la Investigación LPYN 4', '723. López González Yumey'],
  ['LPYN 4-N', 'Jueves', 'N5', '742', 'Metodología de la Investigación LPYN 4', '723. López González Yumey'],
  ['LPYN 4-N', 'Jueves', 'N6', '742', 'Metodología de la Investigación LPYN 4', '723. López González Yumey'],

  // =====================================================
  // 14. LPYN 6-N (Salón 744)
  // =====================================================
  ['LPYN 6-N', 'Lunes', 'N1', '744', 'Desarrollo Neuromotor II y Teoría de Reflejos LPYN 6', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 6-N', 'Lunes', 'N2', '744', 'Desarrollo Neuromotor II y Teoría de Reflejos LPYN 6', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 6-N', 'Lunes', 'N3', '744', 'Gimnasia Cerebral y Movimiento Rítmico LPYN 6', '213. Hernández Pascual Ericka'],
  ['LPYN 6-N', 'Lunes', 'N4', '744', 'Gimnasia Cerebral y Movimiento Rítmico LPYN 6', '213. Hernández Pascual Ericka'],
  ['LPYN 6-N', 'Lunes', 'N5', '744', 'Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LPYN 6', '786. Jonathan Alanís'],
  ['LPYN 6-N', 'Lunes', 'N6', '744', 'Práctica de Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LPYN 6', '786. Jonathan Alanís'],
  ['LPYN 6-N', 'Martes', 'N1', '744', 'Gimnasia Cerebral y Movimiento Rítmico LPYN 6', '213. Hernández Pascual Ericka'],
  ['LPYN 6-N', 'Martes', 'N2', '744', 'Psicopatología II LPYN 6', '682. Ayala Garza Gloria'],
  ['LPYN 6-N', 'Martes', 'N3', '744', 'Psicopatología II LPYN 6', '682. Ayala Garza Gloria'],
  ['LPYN 6-N', 'Martes', 'N4', '744', 'Bases Neurofisiológicas del Aprendizaje LPYN 6', '213. Hernández Pascual Ericka'],
  ['LPYN 6-N', 'Martes', 'N5', '744', 'Desarrollo Neuromotor II y Teoría de Reflejos LPYN 6', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 6-N', 'Martes', 'N6', '744', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LPYN 6', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 6-N', 'Miércoles', 'N3', '744', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LPYN 6', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 6-N', 'Miércoles', 'N4', '744', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LPYN 6', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 6-N', 'Miércoles', 'N5', '744', 'Práctica de Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LPYN 6', '786. Jonathan Alanís'],
  ['LPYN 6-N', 'Miércoles', 'N6', '744', 'Práctica de Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LPYN 6', '786. Jonathan Alanís'],
  ['LPYN 6-N', 'Jueves', 'N1', '744', 'Psicopatología II LPYN 6', '682. Ayala Garza Gloria'],
  ['LPYN 6-N', 'Jueves', 'N2', '744', 'Bases Neurofisiológicas del Aprendizaje LPYN 6', '213. Hernández Pascual Ericka'],
  ['LPYN 6-N', 'Jueves', 'N3', '744', 'Bases Neurofisiológicas del Aprendizaje LPYN 6', '213. Hernández Pascual Ericka'],
  ['LPYN 6-N', 'Jueves', 'N4', '744', 'Psicología Social y Comunitaria LPYN 6', '452. Cano Balboa Gabriela'],
  ['LPYN 6-N', 'Viernes', 'N3', '744', 'Psicología Social y Comunitaria LPYN 6', '452. Cano Balboa Gabriela'],
  ['LPYN 6-N', 'Viernes', 'N4', '744', 'Psicología Social y Comunitaria LPYN 6', '452. Cano Balboa Gabriela'],
  ['LPYN 6-N', 'Viernes', 'N5', '744', 'Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LPYN 6', '786. Jonathan Alanís'],
  ['LPYN 6-N', 'Viernes', 'N6', '744', 'Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LPYN 6', '786. Jonathan Alanís'],

  // =====================================================
  // 15. LPYN 7-N (Salón 745)
  // =====================================================
  ['LPYN 7-N', 'Lunes', 'N2', '745', 'Psicopatología III LPYN 7', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 7-N', 'Lunes', 'N3', '745', 'Neurociencias Cognitivas LPYN 7', '596. Morales Aguirre Mario'],
  ['LPYN 7-N', 'Lunes', 'N4', '745', 'Taller de Intervención y Tratamiento de Problemas Neurológicos y Desarrollo Neuromotor LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Lunes', 'N5', '745', 'Prácticas Psicoanalíticas LPYN 7', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 7-N', 'Lunes', 'N6', '745', 'Neurociencias Cognitivas LPYN 7', '596. Morales Aguirre Mario'],
  ['LPYN 7-N', 'Martes', 'N1', '745', 'Corrientes Psicológicas Psicoanalíticas LPYN 7', '682. Ayala Garza Gloria'],
  ['LPYN 7-N', 'Martes', 'N2', '745', 'Prácticas Psicoanalíticas LPYN 7', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 7-N', 'Martes', 'N3', '745', 'Intervención y Tratamiento de Problemas Neurológicos y Desarrollo Neuromotor LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Martes', 'N4', '745', 'Taller de Intervención y Tratamiento de Problemas Neurológicos y Desarrollo Neuromotor LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Martes', 'N5', '745', 'Neurociencias Cognitivas LPYN 7', '596. Morales Aguirre Mario'],
  ['LPYN 7-N', 'Martes', 'N6', '745', 'Prácticas Psicoanalíticas LPYN 7', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 7-N', 'Miércoles', 'N1', '745', 'Intervención y Tratamiento de Problemas Neurológicos y Desarrollo Neuromotor LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Miércoles', 'N2', '745', 'Intervención y Tratamiento de Problemas Neurológicos y Desarrollo Neuromotor LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Miércoles', 'N3', '745', 'Psicopatología III LPYN 7', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 7-N', 'Miércoles', 'N4', '745', 'Psicopatología III LPYN 7', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 7-N', 'Miércoles', 'N5', '745', 'Taller de Intervención y Tratamiento de Problemas Neurológicos y Desarrollo Neuromotor LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Jueves', 'N1', '745', 'Psicometría LPYN 7', '141. Morales Rodríguez Teresa de Jesús'],
  ['LPYN 7-N', 'Jueves', 'N2', '745', 'Corrientes Psicológicas Psicoanalíticas LPYN 7', '682. Ayala Garza Gloria'],
  ['LPYN 7-N', 'Jueves', 'N3', '745', 'Corrientes Psicológicas Psicoanalíticas LPYN 7', '682. Ayala Garza Gloria'],
  ['LPYN 7-N', 'Jueves', 'N4', '745', 'Supervisión LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Jueves', 'N5', '745', 'Supervisión LPYN 7', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 7-N', 'Viernes', 'N1', '745', 'Psicometría LPYN 7', '141. Morales Rodríguez Teresa de Jesús'],
  ['LPYN 7-N', 'Viernes', 'N2', '745', 'Psicometría LPYN 7', '141. Morales Rodríguez Teresa de Jesús'],
  ['LPYN 7-N', 'Viernes', 'N3', '745', 'Endocrinología y Neuroendocrinología LPYN 7', 'Acosta García Arnaldo Camilo'],
  ['LPYN 7-N', 'Viernes', 'N4', '745', 'Endocrinología y Neuroendocrinología LPYN 7', 'Acosta García Arnaldo Camilo'],
  ['LPYN 7-N', 'Viernes', 'N5', '745', 'Endocrinología y Neuroendocrinología LPYN 7', 'Acosta García Arnaldo Camilo'],

  // =====================================================
  // 16. LPYN 8-N (Salón 931)
  // =====================================================
  ['LPYN 8-N', 'Lunes', 'N1', '931', 'Estimulación Magnética Transcraneal LPYN 8', '694. Cabrieto Valadez María Lucía'],
  ['LPYN 8-N', 'Lunes', 'N2', '931', 'Estimulación Magnética Transcraneal LPYN 8', '694. Cabrieto Valadez María Lucía'],
  ['LPYN 8-N', 'Lunes', 'N3', '931', 'Diagnóstico y Prevención de Conductas de Riesgo y Sociópatas LPYN 8', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 8-N', 'Lunes', 'N4', '931', 'Diagnóstico y Prevención de Conductas de Riesgo y Sociópatas LPYN 8', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 8-N', 'Lunes', 'N5', '931', 'Neuropatologías LPYN 8', '596. Morales Aguirre Mario'],
  ['LPYN 8-N', 'Lunes', 'N6', '931', 'Supervisión LPYN 8', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 8-N', 'Martes', 'N1', '931', 'Neuropatologías LPYN 8', '596. Morales Aguirre Mario'],
  ['LPYN 8-N', 'Martes', 'N2', '931', 'Psicoterapia Individual LPYN 8', '523. Medina Gastelum Roxana'],
  ['LPYN 8-N', 'Martes', 'N3', '931', 'Psicoterapia Individual LPYN 8', '523. Medina Gastelum Roxana'],
  ['LPYN 8-N', 'Martes', 'N4', '931', 'Taller de Diagnóstico y Prevención de Conductas de Riesgo y Sociópatas LPYN 8', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 8-N', 'Martes', 'N5', '931', 'Taller de Diagnóstico y Prevención de Conductas de Riesgo y Sociópatas LPYN 8', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 8-N', 'Miércoles', 'N1', '931', 'Neuropatologías LPYN 8', '596. Morales Aguirre Mario'],
  ['LPYN 8-N', 'Miércoles', 'N2', '931', 'Técnicas de Diagnóstico y Evaluación Psicológica LPYN 8', '339. González Rico Fernando'],
  ['LPYN 8-N', 'Miércoles', 'N3', '931', 'Técnicas de Diagnóstico y Evaluación Psicológica LPYN 8', '339. González Rico Fernando'],
  ['LPYN 8-N', 'Miércoles', 'N4', '931', 'Técnicas de Diagnóstico y Evaluación Psicológica LPYN 8', '339. González Rico Fernando'],
  ['LPYN 8-N', 'Miércoles', 'N5', '931', 'Psicoterapia Individual LPYN 8', '523. Medina Gastelum Roxana'],
  ['LPYN 8-N', 'Miércoles', 'N6', '931', 'Diagnóstico y Prevención de Conductas de Riesgo y Sociópatas LPYN 8', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 8-N', 'Jueves', 'N1', '931', 'Estimulación Magnética Transcraneal LPYN 8', '694. Cabrieto Valadez María Lucía'],
  ['LPYN 8-N', 'Jueves', 'N2', '931', 'Taller de Diagnóstico y Prevención de Conductas de Riesgo y Sociópatas LPYN 8', '86. Cosgalla de la Fuente Jairo Emanuel'],
  ['LPYN 8-N', 'Jueves', 'N3', '931', 'Psicología Cognitiva Conductual LPYN 8', '794. Sánchez Jáuregui Teresa de Jesús'],
  ['LPYN 8-N', 'Jueves', 'N4', '931', 'Psicología Cognitiva Conductual LPYN 8', '794. Sánchez Jáuregui Teresa de Jesús'],
  ['LPYN 8-N', 'Jueves', 'N5', '931', 'Práctica Cognitiva Conductual LPYN 8', '141. Morales Rodríguez Teresa de Jesús'],
  ['LPYN 8-N', 'Jueves', 'N6', '931', 'Supervisión LPYN 8', '214. Zúñiga Hernández Irma Idalia'],
  ['LPYN 8-N', 'Viernes', 'N3', '931', 'Psicología Cognitiva Conductual LPYN 8', '794. Sánchez Jáuregui Teresa de Jesús'],
  ['LPYN 8-N', 'Viernes', 'N4', '931', 'Práctica Cognitiva Conductual LPYN 8', '141. Morales Rodríguez Teresa de Jesús'],
  ['LPYN 8-N', 'Viernes', 'N5', '931', 'Práctica Cognitiva Conductual LPYN 8', '141. Morales Rodríguez Teresa de Jesús'],

  // =====================================================
  // 17. ISC 7-N (Salones 715, 741)
  // =====================================================
  ['ISC 7-N', 'Lunes', 'N1', '715', 'Gestión De Proyectos Del Software ISC 7', '469. Suarez Melquiadez Nallely'],
  ['ISC 7-N', 'Lunes', 'N2', '715', 'Gestión De Proyectos Del Software ISC 7', '469. Suarez Melquiadez Nallely'],
  ['ISC 7-N', 'Lunes', 'N3', '741', 'Taller De Investigación I ISC 7', '399. García Rangel Joel Pablo'],
  ['ISC 7-N', 'Lunes', 'N4', '741', 'Taller De Investigación I ISC 7', '399. García Rangel Joel Pablo'],
  ['ISC 7-N', 'Lunes', 'N5', '741', 'Conmutación Y Enrutamiento En Redes De Datos ISC 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 7-N', 'Lunes', 'N6', '741', 'Taller De Investigación I ISC 7', '399. García Rangel Joel Pablo'],
  ['ISC 7-N', 'Martes', 'N1', '741', 'Investigación De Operaciones ISC 7', '61. Villanueva Herrera Juan Manuel'],
  ['ISC 7-N', 'Martes', 'N2', '741', 'Investigación De Operaciones ISC 7', '61. Villanueva Herrera Juan Manuel'],
  ['ISC 7-N', 'Martes', 'N3', '715', 'Lenguajes Y Autómatas II ISC 7', '399. García Rangel Joel Pablo'],
  ['ISC 7-N', 'Martes', 'N4', '715', 'Lenguajes Y Autómatas II ISC 7', '399. García Rangel Joel Pablo'],
  ['ISC 7-N', 'Martes', 'N5', '715', 'Lenguajes Y Autómatas II ISC 7', '399. García Rangel Joel Pablo'],
  ['ISC 7-N', 'Jueves', 'N1', '741', 'Negocios Electrónicos ISC 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 7-N', 'Jueves', 'N2', '741', 'Investigación De Operaciones ISC 7', '61. Villanueva Herrera Juan Manuel'],
  ['ISC 7-N', 'Jueves', 'N3', '741', 'Investigación De Operaciones ISC 7', '61. Villanueva Herrera Juan Manuel'],
  ['ISC 7-N', 'Jueves', 'N4', '715', 'Conmutación Y Enrutamiento En Redes De Datos ISC 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 7-N', 'Jueves', 'N5', '715', 'Conmutación Y Enrutamiento En Redes De Datos ISC 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 7-N', 'Viernes', 'N1', '715', 'Negocios Electrónicos ISC 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 7-N', 'Viernes', 'N2', '715', 'Negocios Electrónicos ISC 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 7-N', 'Viernes', 'N3', '715', 'Gestión De Proyectos Del Software ISC 7', '469. Suarez Melquiadez Nallely'],
  ['ISC 7-N', 'Viernes', 'N4', '715', 'Gestión De Proyectos Del Software ISC 7', '469. Suarez Melquiadez Nallely'],
  ['ISC 7-N', 'Viernes', 'N5', '741', 'Negocios Electrónicos ISC 7', '425. Cárdenas Cantú Ricardo Baruch'],

  // =====================================================
  // 18. ISC 9-N (Salones 716, 746)
  // =====================================================
  ['ISC 9-N', 'Lunes', 'N4', '746', 'Administración De Servicios De Internet Y Servidores De Correo ISC 9', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 9-N', 'Lunes', 'N5', '746', 'Ética ISC 9', '336. Flores Arana Elizabeth'],
  ['ISC 9-N', 'Lunes', 'N6', '746', 'Servicios De Tecnología De La Información ISC 9', '469. Suarez Melquiadez Nallely'],
  ['ISC 9-N', 'Miércoles', 'N3', '716', 'Simulación Informática ISC 9', '469. Suarez Melquiadez Nallely'],
  ['ISC 9-N', 'Miércoles', 'N4', '716', 'Simulación Informática ISC 9', '469. Suarez Melquiadez Nallely'],
  ['ISC 9-N', 'Miércoles', 'N5', '716', 'Administración De La Función Informática ISC 9', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 9-N', 'Miércoles', 'N6', '716', 'Administración De La Función Informática ISC 9', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 9-N', 'Jueves', 'N1', '716', 'Inteligencia Artificial ISC 9', '399. García Rangel Joel Pablo'],
  ['ISC 9-N', 'Jueves', 'N2', '716', 'Inteligencia Artificial ISC 9', '399. García Rangel Joel Pablo'],
  ['ISC 9-N', 'Jueves', 'N3', '716', 'Inteligencia Artificial ISC 9', '399. García Rangel Joel Pablo'],
  ['ISC 9-N', 'Jueves', 'N4', '746', 'Ética ISC 9', '336. Flores Arana Elizabeth'],
  ['ISC 9-N', 'Jueves', 'N5', '746', 'Ética ISC 9', '336. Flores Arana Elizabeth'],
  ['ISC 9-N', 'Jueves', 'N6', '746', 'Administración De La Función Informática ISC 9', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 9-N', 'Viernes', 'N1', '716', 'Servicios De Tecnología De La Información ISC 9', '469. Suarez Melquiadez Nallely'],
  ['ISC 9-N', 'Viernes', 'N2', '716', 'Servicios De Tecnología De La Información ISC 9', '469. Suarez Melquiadez Nallely'],
  ['ISC 9-N', 'Viernes', 'N3', '716', 'Administración De Servicios De Internet Y Servidores De Correo ISC 9', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 9-N', 'Viernes', 'N4', '716', 'Administración De Servicios De Internet Y Servidores De Correo ISC 9', '425. Cárdenas Cantú Ricardo Baruch'],
  ['ISC 9-N', 'Viernes', 'N5', '746', 'Simulación Informática ISC 9', '469. Suarez Melquiadez Nallely'],

  // =====================================================
  // 19. IIL 3-N (Salones 732, 716)
  // =====================================================
  ['IIL 3-N', 'Lunes', 'N3', '716', 'Programación Orientada a Objetos IIL 3', '469. Suarez Melquiadez Nallely'],
  ['IIL 3-N', 'Lunes', 'N4', '716', 'Programación Orientada a Objetos IIL 3', '469. Suarez Melquiadez Nallely'],
  ['IIL 3-N', 'Lunes', 'N5', '716', 'Programación Orientada a Objetos IIL 3', '469. Suarez Melquiadez Nallely'],
  ['IIL 3-N', 'Lunes', 'N6', '732', 'Ecuaciones Diferenciales IIL 3', '61. Villanueva Herrera Juan Manuel'],
  ['IIL 3-N', 'Martes', 'N1', '732', 'Electromagnetismo IIL 3', '399. García Rangel Joel Pablo'],
  ['IIL 3-N', 'Martes', 'N2', '732', 'Electromagnetismo IIL 3', '399. García Rangel Joel Pablo'],
  ['IIL 3-N', 'Martes', 'N3', '732', 'Inglés III IIL 3', '395. Armijo Vega Fernando Alberto'],
  ['IIL 3-N', 'Martes', 'N4', '732', 'Ecuaciones Diferenciales IIL 3', '61. Villanueva Herrera Juan Manuel'],
  ['IIL 3-N', 'Martes', 'N5', '732', 'Ecuaciones Diferenciales IIL 3', '61. Villanueva Herrera Juan Manuel'],
  ['IIL 3-N', 'Miércoles', 'N1', '732', 'Métodos Numéricos IIL 3', '62. Carrizales Lomas José Odilón'],
  ['IIL 3-N', 'Miércoles', 'N2', '732', 'Métodos Numéricos IIL 3', '62. Carrizales Lomas José Odilón'],
  ['IIL 3-N', 'Miércoles', 'N3', '732', 'Química IIL 3', '298. Benítez Olivares Francisco Javier'],
  ['IIL 3-N', 'Miércoles', 'N4', '732', 'Inglés III IIL 3', '395. Armijo Vega Fernando Alberto'],
  ['IIL 3-N', 'Miércoles', 'N5', '732', 'Inglés III IIL 3', '395. Armijo Vega Fernando Alberto'],
  ['IIL 3-N', 'Miércoles', 'N6', '732', 'Electromagnetismo IIL 3', '399. García Rangel Joel Pablo'],
  ['IIL 3-N', 'Jueves', 'N1', '732', 'Química IIL 3', '298. Benítez Olivares Francisco Javier'],
  ['IIL 3-N', 'Jueves', 'N2', '732', 'Química IIL 3', '298. Benítez Olivares Francisco Javier'],
  ['IIL 3-N', 'Jueves', 'N3', '732', 'Métodos Numéricos IIL 3', '62. Carrizales Lomas José Odilón'],
  ['IIL 3-N', 'Jueves', 'N4', '732', 'Métodos Numéricos IIL 3', '62. Carrizales Lomas José Odilón'],
  ['IIL 3-N', 'Jueves', 'N5', '732', 'Ecuaciones Diferenciales IIL 3', '61. Villanueva Herrera Juan Manuel'],

  // =====================================================
  // 20. IIL 4-N (Salones 737, 733)
  // =====================================================
  ['IIL 4-N', 'Lunes', 'N3', '737', 'Metrología IIL4', '167. Otero Romero Marcial'],
  ['IIL 4-N', 'Lunes', 'N4', '737', 'Metrología IIL4', '167. Otero Romero Marcial'],
  ['IIL 4-N', 'Lunes', 'N5', '737', 'Inglés IV IIL4', '1. Leija Fuentes Verónica'],
  ['IIL 4-N', 'Lunes', 'N6', '737', 'Ingeniería de Tiempo y Movimientos IIL4', '167. Otero Romero Marcial'],
  ['IIL 4-N', 'Miércoles', 'N1', '733', 'Principios de Termodinámica IIL4', '399. García Rangel Joel Pablo'],
  ['IIL 4-N', 'Miércoles', 'N2', '733', 'Modelado de Sistemas IIL4', '298. Benítez Olivares Francisco Javier'],
  ['IIL 4-N', 'Miércoles', 'N3', '733', 'Sistemas Eléctricos IIL4', '399. García Rangel Joel Pablo'],
  ['IIL 4-N', 'Miércoles', 'N4', '733', 'Sistemas Eléctricos IIL4', '399. García Rangel Joel Pablo'],
  ['IIL 4-N', 'Miércoles', 'N5', '733', 'Inglés IV IIL4', '1. Leija Fuentes Verónica'],
  ['IIL 4-N', 'Miércoles', 'N6', '733', 'Inglés IV IIL4', '1. Leija Fuentes Verónica'],
  ['IIL 4-N', 'Jueves', 'N1', '733', 'Metrología IIL4', '167. Otero Romero Marcial'],
  ['IIL 4-N', 'Jueves', 'N2', '733', 'Ingeniería de Tiempo y Movimientos IIL4', '167. Otero Romero Marcial'],
  ['IIL 4-N', 'Jueves', 'N3', '733', 'Modelado de Sistemas IIL4', '298. Benítez Olivares Francisco Javier'],
  ['IIL 4-N', 'Jueves', 'N4', '733', 'Modelado de Sistemas IIL4', '298. Benítez Olivares Francisco Javier'],
  ['IIL 4-N', 'Jueves', 'N5', '733', 'Sistemas Eléctricos IIL4', '399. García Rangel Joel Pablo'],
  ['IIL 4-N', 'Jueves', 'N6', '733', 'Principios de Termodinámica IIL4', '399. García Rangel Joel Pablo'],
  ['IIL 4-N', 'Viernes', 'N2', '733', 'Ingeniería de Tiempo y Movimientos IIL4', '167. Otero Romero Marcial'],
  ['IIL 4-N', 'Viernes', 'N3', '733', 'Metrología IIL4', '167. Otero Romero Marcial'],
  ['IIL 4-N', 'Viernes', 'N4', '733', 'Principios de Termodinámica IIL4', '399. García Rangel Joel Pablo'],
  ['IIL 4-N', 'Viernes', 'N5', '733', 'Principios de Termodinámica IIL4', '399. García Rangel Joel Pablo'],

  // =====================================================
  // 21. IIL 6-N (Salón 734)
  // =====================================================
  ['IIL 6-N', 'Lunes', 'N3', '734', 'Optimización II IIL 6', '425. Cárdenas Cantú Ricardo Baruch'],
  ['IIL 6-N', 'Lunes', 'N4', '734', 'Producción II IIL 6', '262. Pérez Segura Miguel Armando'],
  ['IIL 6-N', 'Lunes', 'N5', '734', 'Técnicas para la Toma de Decisiones IIL 6', '458. Andrade Rivas Irasema'],
  ['IIL 6-N', 'Miércoles', 'N2', '734', 'Optimización II IIL 6', '425. Cárdenas Cantú Ricardo Baruch'],
  ['IIL 6-N', 'Miércoles', 'N3', '734', 'Optimización II IIL 6', '425. Cárdenas Cantú Ricardo Baruch'],
  ['IIL 6-N', 'Miércoles', 'N4', '734', 'Materiales IIL 6', '298. Benítez Olivares Francisco Javier'],
  ['IIL 6-N', 'Miércoles', 'N5', '734', 'Materiales IIL 6', '298. Benítez Olivares Francisco Javier'],
  ['IIL 6-N', 'Miércoles', 'N6', '734', 'Técnicas para la Toma de Decisiones IIL 6', '458. Andrade Rivas Irasema'],
  ['IIL 6-N', 'Jueves', 'N1', '734', 'Administración de Empresas IIL 6', 'Charles Quintero Brandi Sabrina'],
  ['IIL 6-N', 'Jueves', 'N2', '734', 'Administración de Empresas IIL 6', 'Charles Quintero Brandi Sabrina'],
  ['IIL 6-N', 'Jueves', 'N3', '734', 'Producción II IIL 6', '262. Pérez Segura Miguel Armando'],
  ['IIL 6-N', 'Jueves', 'N4', '734', 'Control de Calidad IIL 6', '167. Otero Romero Marcial'],
  ['IIL 6-N', 'Jueves', 'N5', '734', 'Control de Calidad IIL 6', '167. Otero Romero Marcial'],
  ['IIL 6-N', 'Jueves', 'N6', '734', 'Materiales IIL 6', '298. Benítez Olivares Francisco Javier'],
  ['IIL 6-N', 'Viernes', 'N1', '734', 'Producción II IIL 6', '262. Pérez Segura Miguel Armando'],
  ['IIL 6-N', 'Viernes', 'N2', '734', 'Producción II IIL 6', '262. Pérez Segura Miguel Armando'],
  ['IIL 6-N', 'Viernes', 'N3', '734', 'Administración de Empresas IIL 6', 'Charles Quintero Brandi Sabrina'],
  ['IIL 6-N', 'Viernes', 'N4', '734', 'Control de Calidad IIL 6', '167. Otero Romero Marcial'],
  ['IIL 6-N', 'Viernes', 'N5', '734', 'Control de Calidad IIL 6', '167. Otero Romero Marcial'],
  ['IIL 6-N', 'Viernes', 'N6', '734', 'Técnicas para la Toma de Decisiones IIL 6', '458. Andrade Rivas Irasema'],

  // =====================================================
  // 22. IIL 7-N (Salones 736, 934)
  // =====================================================
  ['IIL 7-N', 'Lunes', 'N1', '736', 'Procesos de Manufactura IIL 7', '262. Pérez Segura Miguel Armando'],
  ['IIL 7-N', 'Lunes', 'N2', '736', 'Seminario de Consultoría IIL 7', '458. Andrade Rivas Irasema'],
  ['IIL 7-N', 'Lunes', 'N3', '736', 'Seis Sigma IIL 7', '61. Villanueva Herrera Juan Manuel'],
  ['IIL 7-N', 'Lunes', 'N4', '736', 'Seis Sigma IIL 7', '61. Villanueva Herrera Juan Manuel'],
  ['IIL 7-N', 'Lunes', 'N5', '736', 'Logística IIL 7', '262. Pérez Segura Miguel Armando'],
  ['IIL 7-N', 'Lunes', 'N6', '736', 'Seminario de Consultoría IIL 7', '458. Andrade Rivas Irasema'],
  ['IIL 7-N', 'Martes', 'N3', '736', 'Seis Sigma IIL 7', '61. Villanueva Herrera Juan Manuel'],
  ['IIL 7-N', 'Martes', 'N4', '736', 'Contabilidad para Ingenieros IIL 7', '191. Cerda Mendoza Nohemí'],
  ['IIL 7-N', 'Martes', 'N5', '736', 'Contabilidad para Ingenieros IIL 7', '191. Cerda Mendoza Nohemí'],
  ['IIL 7-N', 'Miércoles', 'N2', '934', 'Logística IIL 7', '262. Pérez Segura Miguel Armando'],
  ['IIL 7-N', 'Miércoles', 'N3', '934', 'Logística IIL 7', '262. Pérez Segura Miguel Armando'],
  ['IIL 7-N', 'Miércoles', 'N4', '934', 'Optimización de Procesos IIL 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['IIL 7-N', 'Miércoles', 'N5', '934', 'Seminario de Consultoría IIL 7', '458. Andrade Rivas Irasema'],
  ['IIL 7-N', 'Jueves', 'N2', '736', 'Optimización de Procesos IIL 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['IIL 7-N', 'Jueves', 'N3', '736', 'Optimización de Procesos IIL 7', '425. Cárdenas Cantú Ricardo Baruch'],
  ['IIL 7-N', 'Jueves', 'N4', '736', 'Seis Sigma IIL 7', '61. Villanueva Herrera Juan Manuel'],
  ['IIL 7-N', 'Jueves', 'N5', '736', 'Contabilidad para Ingenieros IIL 7', '191. Cerda Mendoza Nohemí'],
  ['IIL 7-N', 'Jueves', 'N6', '736', 'Logística IIL 7', '262. Pérez Segura Miguel Armando'],
  ['IIL 7-N', 'Viernes', 'N3', '934', 'Procesos de Manufactura IIL 7', '262. Pérez Segura Miguel Armando'],
  ['IIL 7-N', 'Viernes', 'N4', '934', 'Procesos de Manufactura IIL 7', '262. Pérez Segura Miguel Armando'],

  // =====================================================
  // 23. IIL 8-N (Salones 923, 737)
  // =====================================================
  ['IIL 8-N', 'Martes', 'N3', '923', 'Logística Internacional IIL 8', '781. Flores Godínez Vicente'],
  ['IIL 8-N', 'Martes', 'N4', '923', 'Logística Internacional IIL 8', '781. Flores Godínez Vicente'],
  ['IIL 8-N', 'Martes', 'N5', '923', 'Seminario de Negociación IIL 8', '262. Pérez Segura Miguel Armando'],
  ['IIL 8-N', 'Martes', 'N6', '923', 'Seminario de Negociación IIL 8', '262. Pérez Segura Miguel Armando'],
  ['IIL 8-N', 'Miércoles', 'N1', '923', 'Costos para Ingeniería IIL 8', '191. Cerda Mendoza Nohemí'],
  ['IIL 8-N', 'Miércoles', 'N2', '923', 'Marcas, Patentes y Franquicias IIL 8', 'González Parra Cristian Asael'],
  ['IIL 8-N', 'Miércoles', 'N3', '923', 'Evaluación de Proyectos IIL 8', '458. Andrade Rivas Irasema'],
  ['IIL 8-N', 'Miércoles', 'N4', '923', 'Embalaje IIL 8', 'González Parra Cristian Asael'],
  ['IIL 8-N', 'Miércoles', 'N5', '923', 'Embalaje IIL 8', 'González Parra Cristian Asael'],
  ['IIL 8-N', 'Jueves', 'N2', '737', 'Seminario de Negociación IIL 8', '262. Pérez Segura Miguel Armando'],
  ['IIL 8-N', 'Jueves', 'N3', '737', 'Logística Internacional IIL 8', '781. Flores Godínez Vicente'],
  ['IIL 8-N', 'Jueves', 'N4', '737', 'Embalaje IIL 8', 'González Parra Cristian Asael'],
  ['IIL 8-N', 'Jueves', 'N5', '737', 'Marcas, Patentes y Franquicias IIL 8', 'González Parra Cristian Asael'],
  ['IIL 8-N', 'Jueves', 'N6', '737', 'Costos para Ingeniería IIL 8', '191. Cerda Mendoza Nohemí'],
  ['IIL 8-N', 'Viernes', 'N1', '737', 'Marcas, Patentes y Franquicias IIL 8', 'González Parra Cristian Asael'],
  ['IIL 8-N', 'Viernes', 'N2', '737', 'Embalaje IIL 8', 'González Parra Cristian Asael'],
  ['IIL 8-N', 'Viernes', 'N3', '737', 'Evaluación de Proyectos IIL 8', '458. Andrade Rivas Irasema'],
  ['IIL 8-N', 'Viernes', 'N4', '737', 'Evaluación de Proyectos IIL 8', '458. Andrade Rivas Irasema'],
  ['IIL 8-N', 'Viernes', 'N5', '737', 'Costos para Ingeniería IIL 8', '191. Cerda Mendoza Nohemí'],
  ['IIL 8-N', 'Viernes', 'N6', '737', 'Logística Internacional IIL 8', '781. Flores Godínez Vicente'],

  // =====================================================
  // 24. IIL 9-N (Salón 735)
  // =====================================================
  ['IIL 9-N', 'Martes', 'N1', '735', 'Liderazgo IIL 9', '220. González Mancilla Lilia Laura'],
  ['IIL 9-N', 'Martes', 'N2', '735', 'Liderazgo IIL 9', '220. González Mancilla Lilia Laura'],
  ['IIL 9-N', 'Martes', 'N3', '735', 'Envase y Embalaje Internacional IIL 9', 'González Parra Cristian Asael'],
  ['IIL 9-N', 'Martes', 'N4', '735', 'Arbitraje del Comercio Internacional IIL 9', 'González Parra Cristian Asael'],
  ['IIL 9-N', 'Martes', 'N5', '735', 'Distribución Internacional IIL 9', '781. Flores Godínez Vicente'],
  ['IIL 9-N', 'Miércoles', 'N1', '735', 'Ergonomía IIL 9', '458. Andrade Rivas Irasema'],
  ['IIL 9-N', 'Miércoles', 'N2', '735', 'Liderazgo IIL 9', '220. González Mancilla Lilia Laura'],
  ['IIL 9-N', 'Miércoles', 'N3', '735', 'Envase y Embalaje Internacional IIL 9', 'González Parra Cristian Asael'],
  ['IIL 9-N', 'Miércoles', 'N4', '735', 'Ergonomía IIL 9', '458. Andrade Rivas Irasema'],
  ['IIL 9-N', 'Miércoles', 'N5', '735', 'Seguridad Industrial IIL 9', '399. García Rangel Joel Pablo'],
  ['IIL 9-N', 'Miércoles', 'N6', '735', 'Arbitraje del Comercio Internacional IIL 9', 'González Parra Cristian Asael'],
  ['IIL 9-N', 'Jueves', 'N2', '735', 'Envase y Embalaje Internacional IIL 9', 'González Parra Cristian Asael'],
  ['IIL 9-N', 'Jueves', 'N3', '735', 'Envase y Embalaje Internacional IIL 9', 'González Parra Cristian Asael'],
  ['IIL 9-N', 'Jueves', 'N4', '735', 'Distribución Internacional IIL 9', '781. Flores Godínez Vicente'],
  ['IIL 9-N', 'Jueves', 'N5', '735', 'Distribución Internacional IIL 9', '781. Flores Godínez Vicente'],
  ['IIL 9-N', 'Jueves', 'N6', '735', 'Arbitraje del Comercio Internacional IIL 9', 'González Parra Cristian Asael'],
  ['IIL 9-N', 'Viernes', 'N3', '735', 'Seguridad Industrial IIL 9', '399. García Rangel Joel Pablo'],
  ['IIL 9-N', 'Viernes', 'N4', '735', 'Distribución Internacional IIL 9', '781. Flores Godínez Vicente'],
  ['IIL 9-N', 'Viernes', 'N5', '735', 'Ergonomía IIL 9', '458. Andrade Rivas Irasema'],
  ['IIL 9-N', 'Viernes', 'N6', '735', 'Seguridad Industrial IIL 9', '399. García Rangel Joel Pablo'],

  // =====================================================
  // 25. IM 6-N (Salón 921)
  // =====================================================
  ['IM 6-N', 'Lunes', 'N1', '921', 'Recursos Humanos IM 6', '510. Beltrán Moreno Obet'],
  ['IM 6-N', 'Lunes', 'N2', '921', 'Recursos Humanos IM 6', '510. Beltrán Moreno Obet'],
  ['IM 6-N', 'Lunes', 'N3', '921', 'Microcontroladores IM 6', 'García Ramos Raibel'],
  ['IM 6-N', 'Lunes', 'N4', '921', 'Microcontroladores IM 6', 'García Ramos Raibel'],
  ['IM 6-N', 'Lunes', 'N5', '921', 'Robótica II IM 6', 'García Ramos Raibel'],
  ['IM 6-N', 'Lunes', 'N6', '921', 'Robótica II IM 6', 'García Ramos Raibel'],
  ['IM 6-N', 'Martes', 'N1', '921', 'Recursos Humanos IM 6', '510. Beltrán Moreno Obet'],
  ['IM 6-N', 'Martes', 'N2', '921', 'Simuladores IM 6', '669. Salas Villegas Diego Armando'],
  ['IM 6-N', 'Martes', 'N3', '921', 'Robótica II IM 6', 'García Ramos Raibel'],
  ['IM 6-N', 'Martes', 'N4', '921', 'Microcontroladores IM 6', 'García Ramos Raibel'],
  ['IM 6-N', 'Miércoles', 'N3', '921', 'Ingeniería De Control IM 6', '419. Gutiérrez Flores Alberto Mario Jorge'],
  ['IM 6-N', 'Miércoles', 'N4', '921', 'Ingeniería De Control IM 6', '419. Gutiérrez Flores Alberto Mario Jorge'],
  ['IM 6-N', 'Miércoles', 'N5', '921', 'Controladores Programables IM 6', '669. Salas Villegas Diego Armando'],
  ['IM 6-N', 'Miércoles', 'N6', '921', 'Controladores Programables IM 6', '669. Salas Villegas Diego Armando'],
  ['IM 6-N', 'Viernes', 'N1', '921', 'Ingeniería De Control IM 6', '419. Gutiérrez Flores Alberto Mario Jorge'],
  ['IM 6-N', 'Viernes', 'N2', '921', 'Ingeniería De Control IM 6', '419. Gutiérrez Flores Alberto Mario Jorge'],
  ['IM 6-N', 'Viernes', 'N3', '921', 'Controladores Programables IM 6', '669. Salas Villegas Diego Armando'],
  ['IM 6-N', 'Viernes', 'N4', '921', 'Controladores Programables IM 6', '669. Salas Villegas Diego Armando'],
  ['IM 6-N', 'Viernes', 'N5', '921', 'Simuladores IM 6', '669. Salas Villegas Diego Armando'],
  ['IM 6-N', 'Viernes', 'N6', '921', 'Simuladores IM 6', '669. Salas Villegas Diego Armando'],

  // =====================================================
  // 26. IM 7-N (Salones 711, 922)
  // =====================================================
  ['IM 7-N', 'Lunes', 'N3', '922', 'Estadística IM 7', '338. Moncayo Vázquez Jorge'],
  ['IM 7-N', 'Lunes', 'N4', '922', 'Estadística IM 7', '338. Moncayo Vázquez Jorge'],
  ['IM 7-N', 'Lunes', 'N5', '922', 'Electrónica I IM 7', '669. Salas Villegas Diego Armando'],
  ['IM 7-N', 'Lunes', 'N6', '922', 'Electrónica I IM 7', '669. Salas Villegas Diego Armando'],
  ['IM 7-N', 'Martes', 'N2', '922', 'Estadística IM 7', '338. Moncayo Vázquez Jorge'],
  ['IM 7-N', 'Martes', 'N3', '922', 'Control Digital IM 7', 'Propuesta'],
  ['IM 7-N', 'Martes', 'N4', '922', 'Instrumentación IM 7', '669. Salas Villegas Diego Armando'],
  ['IM 7-N', 'Martes', 'N5', '922', 'Control Digital IM 7', 'Propuesta'],
  ['IM 7-N', 'Martes', 'N6', '922', 'Control Digital IM 7', 'Propuesta'],
  ['IM 7-N', 'Miércoles', 'N1', '711', 'Control Numérico IM 7', '658. Salas Villegas Rubén Darío'],
  ['IM 7-N', 'Miércoles', 'N2', '922', 'Instrumentación IM 7', '669. Salas Villegas Diego Armando'],
  ['IM 7-N', 'Miércoles', 'N3', '922', 'Instrumentación IM 7', '669. Salas Villegas Diego Armando'],
  ['IM 7-N', 'Miércoles', 'N4', '922', 'Mecatrónica I IM 7', 'García Ramos Raibel'],
  ['IM 7-N', 'Miércoles', 'N5', '922', 'Mecatrónica I IM 7', 'García Ramos Raibel'],
  ['IM 7-N', 'Miércoles', 'N6', '922', 'Mecatrónica I IM 7', 'García Ramos Raibel'],
  ['IM 7-N', 'Jueves', 'N2', '922', 'Control Numérico IM 7', '658. Salas Villegas Rubén Darío'],
  ['IM 7-N', 'Jueves', 'N3', '922', 'Control Numérico IM 7', '658. Salas Villegas Rubén Darío'],
  ['IM 7-N', 'Jueves', 'N4', '922', 'Mecatrónica I IM 7', 'García Ramos Raibel'],
  ['IM 7-N', 'Jueves', 'N5', '922', 'Electrónica I IM 7', '669. Salas Villegas Diego Armando'],
  ['IM 7-N', 'Jueves', 'N6', '922', 'Electrónica I IM 7', '669. Salas Villegas Diego Armando'],

  // =====================================================
  // 27. IM 8-N (Salones 711, 735, 716, 734, 741, 712)
  // =====================================================
  ['IM 8-N', 'Lunes', 'N1', '711', 'Taller de Mecatrónica IM 8', 'Rojas Villalon Alfredo'],
  ['IM 8-N', 'Lunes', 'N2', '711', 'Taller de Mecatrónica IM 8', 'Rojas Villalon Alfredo'],
  ['IM 8-N', 'Lunes', 'N3', '735', 'Electrónica II IM 8', '669. Salas Villegas Diego Armando'],
  ['IM 8-N', 'Lunes', 'N4', '735', 'Electrónica II IM 8', '669. Salas Villegas Diego Armando'],
  ['IM 8-N', 'Lunes', 'N5', '735', 'Inteligencia Artificial IM 8', 'Propuesta'],
  ['IM 8-N', 'Lunes', 'N6', '716', 'Inteligencia Artificial IM 8', 'Propuesta'],
  ['IM 8-N', 'Martes', 'N1', '734', 'Inteligencia Artificial IM 8', 'Propuesta'],
  ['IM 8-N', 'Martes', 'N2', '734', 'Inteligencia Artificial IM 8', 'Propuesta'],
  ['IM 8-N', 'Martes', 'N3', '711', 'Dispositivos Automáticos IM 8', '658. Salas Villegas Rubén Darío'],
  ['IM 8-N', 'Martes', 'N4', '711', 'Dispositivos Automáticos IM 8', '658. Salas Villegas Rubén Darío'],
  ['IM 8-N', 'Martes', 'N5', '734', 'Mecatrónica II IM 8', 'García Ramos Raibel'],
  ['IM 8-N', 'Martes', 'N6', '735', 'Mecatrónica II IM 8', 'García Ramos Raibel'],
  ['IM 8-N', 'Miércoles', 'N1', '741', 'Liderazgo IM 8', '510. Beltrán Moreno Obet'],
  ['IM 8-N', 'Miércoles', 'N2', '741', 'Liderazgo IM 8', '510. Beltrán Moreno Obet'],
  ['IM 8-N', 'Miércoles', 'N3', '741', 'Mecatrónica II IM 8', 'García Ramos Raibel'],
  ['IM 8-N', 'Miércoles', 'N4', '741', 'Dispositivos Automáticos IM 8', '658. Salas Villegas Rubén Darío'],
  ['IM 8-N', 'Miércoles', 'N5', '741', 'Liderazgo IM 8', '510. Beltrán Moreno Obet'],
  ['IM 8-N', 'Jueves', 'N2', '711', 'Taller de Mecatrónica IM 8', 'Rojas Villalon Alfredo'],
  ['IM 8-N', 'Jueves', 'N3', '711', 'Taller de Mecatrónica IM 8', 'Rojas Villalon Alfredo'],
  ['IM 8-N', 'Jueves', 'N4', '712', 'Electrónica II IM 8', '669. Salas Villegas Diego Armando'],

  // =====================================================
  // 28. IM 9-N (Salones 712, 746, 711, 723, 721)
  // =====================================================
  ['IM 9-N', 'Martes', 'N1', '712', 'Sistemas Difusos y Redes Neuronales IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Martes', 'N2', '712', 'Sistemas Difusos y Redes Neuronales IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Martes', 'N3', '712', 'Seminario de Consultoría IM 9', '416. Caballero Ortega Jaime'],
  ['IM 9-N', 'Martes', 'N4', '712', 'Seminario de Consultoría IM 9', '416. Caballero Ortega Jaime'],
  ['IM 9-N', 'Miércoles', 'N3', '746', 'Sistemas Difusos y Redes Neuronales IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Miércoles', 'N4', '746', 'Evaluación de Proyectos IM 9', '501. Soto Castellanos Axel Eduardo'],
  ['IM 9-N', 'Miércoles', 'N5', '711', 'Sistemas Embebidos en FPGA IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Miércoles', 'N6', '711', 'Sistemas Embebidos en FPGA IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Jueves', 'N1', '723', 'Sistemas Difusos y Redes Neuronales IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Jueves', 'N2', '723', 'Evaluación de Proyectos IM 9', '501. Soto Castellanos Axel Eduardo'],
  ['IM 9-N', 'Jueves', 'N3', '746', 'Mecatrónica III IM 9', 'García Ramos Raibel'],
  ['IM 9-N', 'Jueves', 'N4', '711', 'Sistemas Embebidos en FPGA IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Jueves', 'N5', '711', 'Sistemas Embebidos en FPGA IM 9', '658. Salas Villegas Rubén Darío'],
  ['IM 9-N', 'Jueves', 'N6', '723', 'Taller de Mecatrónica II IM 9', 'García Ramos Raibel'],
  ['IM 9-N', 'Viernes', 'N1', '746', 'Seminario de Consultoría IM 9', '416. Caballero Ortega Jaime'],
  ['IM 9-N', 'Viernes', 'N2', '746', 'Mecatrónica III IM 9', 'García Ramos Raibel'],
  ['IM 9-N', 'Viernes', 'N3', '746', 'Mecatrónica III IM 9', 'García Ramos Raibel'],
  ['IM 9-N', 'Viernes', 'N4', '721', 'Evaluación de Proyectos IM 9', '501. Soto Castellanos Axel Eduardo'],
  ['IM 9-N', 'Viernes', 'N5', '721', 'Taller de Mecatrónica II IM 9', 'García Ramos Raibel'],
  ['IM 9-N', 'Viernes', 'N6', '746', 'Taller de Mecatrónica II IM 9', 'García Ramos Raibel'],

  // =====================================================
  // 29. IMA 7-N (Salones 737, 923)
  // =====================================================
  ['IMA 7-N', 'Martes', 'N1', '737', 'Automatización Industrial IMA 7', '752. López Sandín Iosvany'],
  ['IMA 7-N', 'Martes', 'N2', '737', 'Administración De La Producción IMA 7', '262. Pérez Segura Miguel Armando'],
  ['IMA 7-N', 'Martes', 'N3', '737', 'Motores De Combustión Interna IMA 7', '752. López Sandín Iosvany'],
  ['IMA 7-N', 'Martes', 'N4', '737', 'Motores De Combustión Interna IMA 7', '752. López Sandín Iosvany'],
  ['IMA 7-N', 'Martes', 'N5', '737', 'Manufactura Avanzada IMA 7', '669. Salas Villegas Diego Armando'],
  ['IMA 7-N', 'Martes', 'N6', '737', 'Vibraciones Mecánicas IMA 7', '781. Flores Godínez Vicente'],
  ['IMA 7-N', 'Miércoles', 'N2', '737', 'Motores De Combustión Interna IMA 7', '752. López Sandín Iosvany'],
  ['IMA 7-N', 'Miércoles', 'N3', '737', 'Motores De Combustión Interna IMA 7', '752. López Sandín Iosvany'],
  ['IMA 7-N', 'Miércoles', 'N4', '737', 'Manufactura Avanzada IMA 7', '669. Salas Villegas Diego Armando'],
  ['IMA 7-N', 'Miércoles', 'N5', '737', 'Seguridad Industrial IMA 7', '262. Pérez Segura Miguel Armando'],
  ['IMA 7-N', 'Miércoles', 'N6', '737', 'Seguridad Industrial IMA 7', '262. Pérez Segura Miguel Armando'],
  ['IMA 7-N', 'Jueves', 'N1', '923', 'Administración De La Producción IMA 7', '262. Pérez Segura Miguel Armando'],
  ['IMA 7-N', 'Jueves', 'N2', '923', 'Vibraciones Mecánicas IMA 7', '781. Flores Godínez Vicente'],
  ['IMA 7-N', 'Jueves', 'N3', '923', 'Manufactura Avanzada IMA 7', '669. Salas Villegas Diego Armando'],
  ['IMA 7-N', 'Viernes', 'N1', '923', 'Vibraciones Mecánicas IMA 7', '781. Flores Godínez Vicente'],
  ['IMA 7-N', 'Viernes', 'N2', '923', 'Vibraciones Mecánicas IMA 7', '781. Flores Godínez Vicente'],
  ['IMA 7-N', 'Viernes', 'N3', '923', 'Automatización Industrial IMA 7', '752. López Sandín Iosvany'],
  ['IMA 7-N', 'Viernes', 'N4', '923', 'Automatización Industrial IMA 7', '752. López Sandín Iosvany'],
  ['IMA 7-N', 'Viernes', 'N5', '923', 'Seguridad Industrial IMA 7', '262. Pérez Segura Miguel Armando'],
  ['IMA 7-N', 'Viernes', 'N6', '923', 'Administración De La Producción IMA 7', '262. Pérez Segura Miguel Armando'],

  // =====================================================
  // 30. IMA 9-N (Salones 924, 714)
  // =====================================================
  ['IMA 9-N', 'Lunes', 'N1', '924', 'Sistemas De Suspensión, Dirección Y Frenos IMA 9', 'Cruz Rodríguez Ernesto'],
  ['IMA 9-N', 'Lunes', 'N2', '924', 'Sistemas De Suspensión, Dirección Y Frenos IMA 9', 'Cruz Rodríguez Ernesto'],
  ['IMA 9-N', 'Lunes', 'N3', '924', 'Ética IMA 9', '336. Flores Arana Elizabeth'],
  ['IMA 9-N', 'Lunes', 'N4', '924', 'Ética IMA 9', '336. Flores Arana Elizabeth'],
  ['IMA 9-N', 'Martes', 'N1', '924', 'Implementación Y Evaluación De Proyectos IMA 9', '64. Gómez Rodríguez Manuel Alejandro'],
  ['IMA 9-N', 'Martes', 'N2', '924', 'Implementación Y Evaluación De Proyectos IMA 9', '64. Gómez Rodríguez Manuel Alejandro'],
  ['IMA 9-N', 'Martes', 'N3', '924', 'Implementación Y Evaluación De Proyectos IMA 9', '64. Gómez Rodríguez Manuel Alejandro'],
  ['IMA 9-N', 'Martes', 'N4', '924', 'Calidad Y Productividad IMA 9', '262. Pérez Segura Miguel Armando'],
  ['IMA 9-N', 'Martes', 'N5', '714', 'Modelado Y Aerodinámica Automotriz IMA 9', '752. López Sandín Iosvany'],
  ['IMA 9-N', 'Miércoles', 'N1', '924', 'Ingeniería Ambiental IMA 9', '338. Moncayo Vázquez Jorge'],
  ['IMA 9-N', 'Miércoles', 'N2', '924', 'Ingeniería Ambiental IMA 9', '338. Moncayo Vázquez Jorge'],
  ['IMA 9-N', 'Miércoles', 'N3', '924', 'Sistemas De Suspensión, Dirección Y Frenos IMA 9', 'Cruz Rodríguez Ernesto'],
  ['IMA 9-N', 'Miércoles', 'N4', '924', 'Sistemas De Suspensión, Dirección Y Frenos IMA 9', 'Cruz Rodríguez Ernesto'],
  ['IMA 9-N', 'Miércoles', 'N5', '714', 'Modelado Y Aerodinámica Automotriz IMA 9', '752. López Sandín Iosvany'],
  ['IMA 9-N', 'Miércoles', 'N6', '714', 'Modelado Y Aerodinámica Automotriz IMA 9', '752. López Sandín Iosvany'],
  ['IMA 9-N', 'Jueves', 'N1', '924', 'Ingeniería Ambiental IMA 9', '338. Moncayo Vázquez Jorge'],
  ['IMA 9-N', 'Jueves', 'N2', '924', 'Ingeniería Ambiental IMA 9', '338. Moncayo Vázquez Jorge'],
  ['IMA 9-N', 'Jueves', 'N3', '924', 'Ética IMA 9', '336. Flores Arana Elizabeth'],
  ['IMA 9-N', 'Jueves', 'N4', '924', 'Calidad Y Productividad IMA 9', '262. Pérez Segura Miguel Armando'],
  ['IMA 9-N', 'Jueves', 'N5', '924', 'Calidad Y Productividad IMA 9', '262. Pérez Segura Miguel Armando'],

  // =====================================================
  // 31. IA 4-N (Salones 733, 736, 831, 712, 714)
  // =====================================================
  ['IA 4-N', 'Lunes', 'N1', '733', 'Topografía y Campo IA 4', '12. Cantú Cavazos Gerardo'],
  ['IA 4-N', 'Lunes', 'N2', '733', 'Topografía y Campo IA 4', '12. Cantú Cavazos Gerardo'],
  ['IA 4-N', 'Lunes', 'N3', '733', 'Inglés IV IA 4', '1. Leija Fuentes Verónica'],
  ['IA 4-N', 'Martes', 'N1', '736', 'Topografía y Campo IA 4', '12. Cantú Cavazos Gerardo'],
  ['IA 4-N', 'Martes', 'N2', '736', 'Topografía y Campo IA 4', '12. Cantú Cavazos Gerardo'],
  ['IA 4-N', 'Martes', 'N3', '831', 'Taller de Proyectos II IA 4', '432. Santiago Xochihua Héctor Fabián'],
  ['IA 4-N', 'Martes', 'N4', '831', 'Taller de Proyectos II IA 4', '432. Santiago Xochihua Héctor Fabián'],
  ['IA 4-N', 'Martes', 'N5', '831', 'Taller de Proyectos II IA 4', '432. Santiago Xochihua Héctor Fabián'],
  ['IA 4-N', 'Miércoles', 'N1', '736', 'Estructuras I IA 4', '501. Soto Castellanos Axel Eduardo'],
  ['IA 4-N', 'Miércoles', 'N2', '736', 'Estructuras I IA 4', '501. Soto Castellanos Axel Eduardo'],
  ['IA 4-N', 'Miércoles', 'N3', '736', 'Inglés IV IA 4', '1. Leija Fuentes Verónica'],
  ['IA 4-N', 'Miércoles', 'N4', '736', 'Inglés IV IA 4', '1. Leija Fuentes Verónica'],
  ['IA 4-N', 'Miércoles', 'N5', '736', 'Resistencia y Materiales IA 4', '501. Soto Castellanos Axel Eduardo'],
  ['IA 4-N', 'Miércoles', 'N6', '736', 'Resistencia y Materiales IA 4', '501. Soto Castellanos Axel Eduardo'],
  ['IA 4-N', 'Viernes', 'N1', '712', 'Estructuras I IA 4', '501. Soto Castellanos Axel Eduardo'],
  ['IA 4-N', 'Viernes', 'N2', '712', 'Estructuras I IA 4', '501. Soto Castellanos Axel Eduardo'],
  ['IA 4-N', 'Viernes', 'N3', '714', 'Diseño Asistido por Computadora IA 4', '453. García González Merardo'],
  ['IA 4-N', 'Viernes', 'N4', '714', 'Diseño Asistido por Computadora IA 4', '453. García González Merardo'],
  ['IA 4-N', 'Viernes', 'N5', '714', 'Diseño Asistido por Computadora IA 4', '453. García González Merardo'],
  ['IA 4-N', 'Viernes', 'N6', '712', 'Resistencia y Materiales IA 4', '501. Soto Castellanos Axel Eduardo'],

  // =====================================================
  // 32. LEIP 6-N (Salón 726)
  // =====================================================
  ['LEIP 6-N', 'Lunes', 'N1', '726', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento Lógico - Matemático en la Infancia LEIP 6', '769. Rivera Zurita Paloma'],
  ['LEIP 6-N', 'Lunes', 'N2', '726', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento Lógico - Matemático en la Infancia LEIP 6', '769. Rivera Zurita Paloma'],
  ['LEIP 6-N', 'Lunes', 'N3', '726', 'Metodología de la Enseñanza de la Educación Plástica Espacial y Apreciación Artística Infantil LEIP 6', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 6-N', 'Lunes', 'N4', '726', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento Lógico - Matemático en la Infancia LEIP 6', '769. Rivera Zurita Paloma'],
  ['LEIP 6-N', 'Martes', 'N3', '726', 'Neuropedagogía y Neurodidáctica LEIP 6', '381. Cano López José Gustavo'],
  ['LEIP 6-N', 'Martes', 'N4', '726', 'Observación y Práctica Docente de Educación Temprana (3 hasta 6 años) LEIP 6', '633. Vázquez Solís Alejandro'],
  ['LEIP 6-N', 'Martes', 'N5', '726', 'Observación y Práctica Docente de Educación Temprana (3 hasta 6 años) LEIP 6', '633. Vázquez Solís Alejandro'],
  ['LEIP 6-N', 'Martes', 'N6', '726', 'Observación y Práctica Docente de Educación Temprana (3 hasta 6 años) LEIP 6', '633. Vázquez Solís Alejandro'],
  ['LEIP 6-N', 'Miércoles', 'N1', '726', 'Taller de Elaboración de Materiales Didácticos LEIP 6', '490. López Coss Rocío Anaís'],
  ['LEIP 6-N', 'Miércoles', 'N2', '726', 'Taller de Elaboración de Materiales Didácticos LEIP 6', '490. López Coss Rocío Anaís'],
  ['LEIP 6-N', 'Miércoles', 'N3', '726', 'Neuropedagogía y Neurodidáctica LEIP 6', '381. Cano López José Gustavo'],
  ['LEIP 6-N', 'Miércoles', 'N4', '726', 'Neuropedagogía y Neurodidáctica LEIP 6', '381. Cano López José Gustavo'],
  ['LEIP 6-N', 'Jueves', 'N1', '726', 'Educación Preescolar (3 a 6 años) LEIP 6', '769. Rivera Zurita Paloma'],
  ['LEIP 6-N', 'Jueves', 'N2', '726', 'Taller de Elaboración de Materiales Didácticos LEIP 6', '490. López Coss Rocío Anaís'],
  ['LEIP 6-N', 'Jueves', 'N3', '726', 'Metodología de la Enseñanza de la Educación Plástica Espacial y Apreciación Artística Infantil LEIP 6', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 6-N', 'Jueves', 'N4', '726', 'Metodología de la Enseñanza de la Educación Plástica Espacial y Apreciación Artística Infantil LEIP 6', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 6-N', 'Jueves', 'N5', '726', 'Metodología de la Enseñanza de la Educación Musical, Danza y Expresión Corporal Infantil LEIP 6', '490. López Coss Rocío Anaís'],
  ['LEIP 6-N', 'Jueves', 'N6', '726', 'Metodología de la Enseñanza de la Educación Musical, Danza y Expresión Corporal Infantil LEIP 6', '490. López Coss Rocío Anaís'],
  ['LEIP 6-N', 'Viernes', 'N1', '726', 'Metodología de la Investigación LEIP 6', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 6-N', 'Viernes', 'N2', '726', 'Metodología de la Investigación LEIP 6', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 6-N', 'Viernes', 'N3', '726', 'Educación Preescolar (3 a 6 años) LEIP 6', '769. Rivera Zurita Paloma'],
  ['LEIP 6-N', 'Viernes', 'N4', '726', 'Educación Preescolar (3 a 6 años) LEIP 6', '769. Rivera Zurita Paloma'],
  ['LEIP 6-N', 'Viernes', 'N5', '726', 'Metodología de la Enseñanza de la Educación Musical, Danza y Expresión Corporal Infantil LEIP 6', '490. López Coss Rocío Anaís'],
  ['LEIP 6-N', 'Viernes', 'N6', '726', 'Metodología de la Investigación LEIP 6', '299. Renovato Cruz Jorge Alberto'],

  // =====================================================
  // 33. LEIP 7-N1 (Salón 721)
  // =====================================================
  ['LEIP 7-N1', 'Lunes', 'N1', '721', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 7-N1', 'Lunes', 'N2', '721', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 7-N1', 'Lunes', 'N3', '721', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N1', 'Lunes', 'N4', '721', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N1', 'Lunes', 'N5', '721', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],
  ['LEIP 7-N1', 'Lunes', 'N6', '721', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N1', 'Martes', 'N1', '721', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N1', 'Martes', 'N2', '721', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N1', 'Martes', 'N3', '721', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N1', 'Martes', 'N4', '721', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N1', 'Martes', 'N5', '721', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N1', 'Martes', 'N6', '721', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N1', 'Miércoles', 'N1', '721', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 7-N1', 'Miércoles', 'N2', '721', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N1', 'Miércoles', 'N3', '721', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N1', 'Miércoles', 'N4', '721', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N1', 'Miércoles', 'N5', '721', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N1', 'Miércoles', 'N6', '721', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N1', 'Jueves', 'N1', '721', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N1', 'Jueves', 'N2', '721', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N1', 'Jueves', 'N3', '721', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],
  ['LEIP 7-N1', 'Jueves', 'N4', '721', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],
  ['LEIP 7-N1', 'Jueves', 'N5', '721', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N1', 'Jueves', 'N6', '721', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],

  // =====================================================
  // 34. LEIP 7-N2 (Salón 722)
  // =====================================================
  ['LEIP 7-N2', 'Lunes', 'N1', '722', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N2', 'Lunes', 'N2', '722', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N2', 'Lunes', 'N3', '722', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],
  ['LEIP 7-N2', 'Lunes', 'N4', '722', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N2', 'Lunes', 'N5', '722', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N2', 'Lunes', 'N6', '722', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N2', 'Martes', 'N1', '722', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N2', 'Martes', 'N2', '722', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N2', 'Martes', 'N3', '722', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N2', 'Martes', 'N4', '722', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N2', 'Martes', 'N5', '722', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N2', 'Martes', 'N6', '722', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N2', 'Miércoles', 'N1', '722', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N2', 'Miércoles', 'N2', '722', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N2', 'Miércoles', 'N3', '722', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '560. Cabrera Julio César'],
  ['LEIP 7-N2', 'Miércoles', 'N4', '722', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N2', 'Miércoles', 'N5', '722', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N2', 'Miércoles', 'N6', '722', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N2', 'Jueves', 'N1', '722', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '560. Cabrera Julio César'],
  ['LEIP 7-N2', 'Jueves', 'N2', '722', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '560. Cabrera Julio César'],
  ['LEIP 7-N2', 'Jueves', 'N3', '722', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N2', 'Jueves', 'N4', '722', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N2', 'Jueves', 'N5', '722', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],
  ['LEIP 7-N2', 'Jueves', 'N6', '722', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],

  // =====================================================
  // 35. LEIP 7-N3 (Salón 723)
  // =====================================================
  ['LEIP 7-N3', 'Lunes', 'N1', '723', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N3', 'Lunes', 'N2', '723', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N3', 'Lunes', 'N3', '723', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N3', 'Lunes', 'N4', '723', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N3', 'Lunes', 'N5', '723', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N3', 'Lunes', 'N6', '723', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],
  ['LEIP 7-N3', 'Martes', 'N1', '723', 'Prevención y Salud Escolar LEIP 7', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 7-N3', 'Martes', 'N2', '723', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N3', 'Martes', 'N3', '723', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N3', 'Martes', 'N4', '723', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N3', 'Martes', 'N5', '723', 'Evaluación Psicopedagógica Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N3', 'Martes', 'N6', '723', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N3', 'Miércoles', 'N1', '723', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N3', 'Miércoles', 'N2', '723', 'Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '381. Cano López José Gustavo'],
  ['LEIP 7-N3', 'Miércoles', 'N3', '723', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N3', 'Miércoles', 'N4', '723', 'Diversidad y Problemas del Desarrollo Infantil LEIP 7', '561. González Garza Dalia Azucena'],
  ['LEIP 7-N3', 'Miércoles', 'N5', '723', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '560. Cabrera Julio César'],
  ['LEIP 7-N3', 'Miércoles', 'N6', '723', 'Taller de Desarrollo Neuromotor y Teoría de los Reflejos LEIP 7', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 7-N3', 'Viernes', 'N1', '723', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '560. Cabrera Julio César'],
  ['LEIP 7-N3', 'Viernes', 'N2', '723', 'Metodología de la Enseñanza para el Desarrollo del Pensamiento, Lenguaje y Literatura Infantil LEIP 7', '560. Cabrera Julio César'],
  ['LEIP 7-N3', 'Viernes', 'N3', '723', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N3', 'Viernes', 'N4', '723', 'Metodología de la Investigación Educativa LEIP 7', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 7-N3', 'Viernes', 'N5', '723', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],
  ['LEIP 7-N3', 'Viernes', 'N6', '723', 'Metodología de la Enseñanza del Entorno Natural y de la Vida Social en la Educación Infantil LEIP 7', '769. Rivera Zurita Paloma'],

  // =====================================================
  // 36. LEIP 8-N (Salón 724)
  // =====================================================
  ['LEIP 8-N', 'Lunes', 'N1', '724', 'Ética Personal y Profesional LEIP 8', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 8-N', 'Lunes', 'N2', '724', 'Taller de Intervención de Problemas Neurológicos y del Desarrollo Neuromotor LEIP 8', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 8-N', 'Lunes', 'N3', '724', 'Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LEIP 8', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 8-N', 'Lunes', 'N4', '724', 'Técnicas de Estimulación Temprana I LEIP 8', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 8-N', 'Lunes', 'N5', '724', 'Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LEIP 8', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 8-N', 'Lunes', 'N6', '724', 'Modalidades de Atención de la Educación Inicial y Preescolar LEIP 8', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 8-N', 'Martes', 'N1', '724', 'Taller de Intervención de Problemas Neurológicos y del Desarrollo Neuromotor LEIP 8', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 8-N', 'Martes', 'N2', '724', 'Taller de Intervención de Problemas Neurológicos y del Desarrollo Neuromotor LEIP 8', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 8-N', 'Martes', 'N3', '724', 'Ética Personal y Profesional LEIP 8', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 8-N', 'Martes', 'N4', '724', 'Detección Temprana de Problemas Neurológicos y del Desarrollo Neuromotor LEIP 8', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 8-N', 'Martes', 'N5', '724', 'Técnicas de Estimulación Temprana I LEIP 8', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 8-N', 'Martes', 'N6', '724', 'Técnicas de Estimulación Temprana I LEIP 8', '364. Padilla Jalpa María del Rocío'],
  ['LEIP 8-N', 'Miércoles', 'N3', '724', 'Modalidades de Atención de la Educación Inicial y Preescolar LEIP 8', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 8-N', 'Miércoles', 'N4', '724', 'Modalidades de Atención de la Educación Inicial y Preescolar LEIP 8', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 8-N', 'Miércoles', 'N5', '724', 'Indicadores para la Evaluación del Desarrollo Infantil LEIP 8', '381. Cano López José Gustavo'],
  ['LEIP 8-N', 'Jueves', 'N2', '724', 'Teorías y Prácticas del Juego Infantil LEIP 8', '769. Rivera Zurita Paloma'],
  ['LEIP 8-N', 'Jueves', 'N3', '724', 'Planeación y Organización Escolar LEIP 8', '490. López Coss Rocío Anaís'],
  ['LEIP 8-N', 'Jueves', 'N4', '724', 'Indicadores para la Evaluación del Desarrollo Infantil LEIP 8', '381. Cano López José Gustavo'],
  ['LEIP 8-N', 'Jueves', 'N5', '724', 'Indicadores para la Evaluación del Desarrollo Infantil LEIP 8', '381. Cano López José Gustavo'],
  ['LEIP 8-N', 'Viernes', 'N1', '724', 'Teorías y Prácticas del Juego Infantil LEIP 8', '769. Rivera Zurita Paloma'],
  ['LEIP 8-N', 'Viernes', 'N2', '724', 'Teorías y Prácticas del Juego Infantil LEIP 8', '769. Rivera Zurita Paloma'],
  ['LEIP 8-N', 'Viernes', 'N3', '724', 'Planeación y Organización Escolar LEIP 8', '490. López Coss Rocío Anaís'],
  ['LEIP 8-N', 'Viernes', 'N4', '724', 'Planeación y Organización Escolar LEIP 8', '490. López Coss Rocío Anaís'],
  ['LEIP 8-N', 'Viernes', 'N5', '724', 'Ética Personal y Profesional LEIP 8', '299. Renovato Cruz Jorge Alberto'],

  // =====================================================
  // 37. LEIP 9-N (Salón 713)
  // =====================================================
  ['LEIP 9-N', 'Lunes', 'N1', '713', 'Gestión de Funciones Directivas en las Instituciones Educativas de la Primera Infancia LEIP 9', '561. González Garza Dalia Azucena'],
  ['LEIP 9-N', 'Lunes', 'N2', '713', 'Técnicas de Estimulación Temprana II LEIP 9', '561. González Garza Dalia Azucena'],
  ['LEIP 9-N', 'Lunes', 'N3', '713', 'Currículo de la Educación Inicial y Preescolar LEIP 9', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 9-N', 'Lunes', 'N4', '713', 'Currículo de la Educación Inicial y Preescolar LEIP 9', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 9-N', 'Lunes', 'N5', '713', 'Observación y Prácticas de Educación Inicial (0 hasta 3 años) LEIP 9', '490. López Coss Rocío Anaís'],
  ['LEIP 9-N', 'Martes', 'N1', '713', 'Comunicación y Relaciones Humanas LEIP 9', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 9-N', 'Martes', 'N2', '713', 'Observación y Prácticas de Educación Preescolar (3 hasta 6 años) LEIP 9', '490. López Coss Rocío Anaís'],
  ['LEIP 9-N', 'Martes', 'N3', '713', 'Observación y Prácticas de Educación Preescolar (3 hasta 6 años) LEIP 9', '490. López Coss Rocío Anaís'],
  ['LEIP 9-N', 'Martes', 'N4', '713', 'Observación y Prácticas de Educación Inicial (0 hasta 3 años) LEIP 9', '490. López Coss Rocío Anaís'],
  ['LEIP 9-N', 'Martes', 'N5', '713', 'Observación y Prácticas Técnicas de Estimulación Temprana LEIP 9', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 9-N', 'Miércoles', 'N1', '713', 'Técnicas de Estimulación Temprana II LEIP 9', '561. González Garza Dalia Azucena'],
  ['LEIP 9-N', 'Miércoles', 'N2', '713', 'Técnicas de Estimulación Temprana II LEIP 9', '561. González Garza Dalia Azucena'],
  ['LEIP 9-N', 'Miércoles', 'N3', '713', 'Observación y Prácticas Técnicas de Estimulación Temprana LEIP 9', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 9-N', 'Miércoles', 'N4', '713', 'Observación y Prácticas Técnicas de Estimulación Temprana LEIP 9', '235. Serrano Sosa Juan Carlos'],
  ['LEIP 9-N', 'Miércoles', 'N5', '713', 'Currículo de la Educación Inicial y Preescolar LEIP 9', '326. Sauceda Velázquez Norma Araceli'],
  ['LEIP 9-N', 'Jueves', 'N1', '713', 'Gestión de Funciones Directivas en las Instituciones Educativas de la Primera Infancia LEIP 9', '561. González Garza Dalia Azucena'],
  ['LEIP 9-N', 'Jueves', 'N2', '713', 'Gestión de Funciones Directivas en las Instituciones Educativas de la Primera Infancia LEIP 9', '561. González Garza Dalia Azucena'],
  ['LEIP 9-N', 'Jueves', 'N3', '713', 'Seminario de Preparación y Elaboración de Tesis LEIP 9', '560. Cabrera Julio César'],
  ['LEIP 9-N', 'Jueves', 'N4', '713', 'Observación y Prácticas de Educación Inicial (0 hasta 3 años) LEIP 9', '490. López Coss Rocío Anaís'],
  ['LEIP 9-N', 'Jueves', 'N5', '713', 'Comunicación y Relaciones Humanas LEIP 9', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 9-N', 'Jueves', 'N6', '713', 'Comunicación y Relaciones Humanas LEIP 9', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 9-N', 'Viernes', 'N2', '713', 'Observación y Prácticas de Educación Preescolar (3 hasta 6 años) LEIP 9', '490. López Coss Rocío Anaís'],
  ['LEIP 9-N', 'Viernes', 'N3', '713', 'Seminario de Preparación y Elaboración de Tesis LEIP 9', '560. Cabrera Julio César'],
  ['LEIP 9-N', 'Viernes', 'N4', '713', 'Seminario de Preparación y Elaboración de Tesis LEIP 9', '560. Cabrera Julio César'],

  // =====================================================
  // 38. LEIP 10-N1 (Salón 712)
  // =====================================================
  ['LEIP 10-N1', 'Miércoles', 'N1', '712', 'Supervisión y Evaluación de Prácticas Profesionales LEIP 10', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 10-N1', 'Miércoles', 'N2', '712', 'Supervisión y Evaluación de Prácticas Profesionales LEIP 10', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 10-N1', 'Miércoles', 'N3', '712', 'Supervisión y Evaluación de Prácticas Profesionales LEIP 10', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 10-N1', 'Miércoles', 'N4', '712', 'Prácticas Profesionales LEIP 10', '490. López Coss Rocío Anaís'],
  ['LEIP 10-N1', 'Miércoles', 'N5', '712', 'Prácticas Profesionales LEIP 10', '490. López Coss Rocío Anaís'],
  ['LEIP 10-N1', 'Miércoles', 'N6', '712', 'Prácticas Profesionales LEIP 10', '490. López Coss Rocío Anaís'],

  // =====================================================
  // 39. LEIP 10-N2 (Salón 712)
  // =====================================================
  ['LEIP 10-N2', 'Lunes', 'N1', '712', 'Prácticas Profesionales LEIP 10', '490. López Coss Rocío Anaís'],
  ['LEIP 10-N2', 'Lunes', 'N2', '712', 'Prácticas Profesionales LEIP 10', '490. López Coss Rocío Anaís'],
  ['LEIP 10-N2', 'Lunes', 'N3', '712', 'Prácticas Profesionales LEIP 10', '490. López Coss Rocío Anaís'],
  ['LEIP 10-N2', 'Lunes', 'N4', '712', 'Supervisión y Evaluación de Prácticas Profesionales LEIP 10', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 10-N2', 'Lunes', 'N5', '712', 'Supervisión y Evaluación de Prácticas Profesionales LEIP 10', '299. Renovato Cruz Jorge Alberto'],
  ['LEIP 10-N2', 'Lunes', 'N6', '712', 'Supervisión y Evaluación de Prácticas Profesionales LEIP 10', '299. Renovato Cruz Jorge Alberto'],
];

export const INITIAL_NIGHTLY_SCHEDULE_ENTRIES: ScheduleEntry[] =
  RAW_NIGHTLY_SCHEDULES.map(([group, day, blockCode, classroomCode, subjectName, professor], idx) => ({
    id: `sch-${idx + 1}`,
    group,
    day,
    blockCode,
    classroomCode,
    subjectName,
    professor,
  }));

export const GROUPS_LIST: string[] = Array.from(
  new Set(INITIAL_NIGHTLY_SCHEDULE_ENTRIES.map((e) => e.group))
);

export const SCHOOL_DAYS: DayOfWeek[] = [
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
];

export interface ScheduleOverlapItem {
  kind: 'salon' | 'docente' | 'grupo';
  day: DayOfWeek;
  blockCode: string;
  keyLabel: string;
  entries: ScheduleEntry[];
}

export interface OverlapReport {
  roomOverlaps: ScheduleOverlapItem[];
  professorOverlaps: ScheduleOverlapItem[];
  groupOverlaps: ScheduleOverlapItem[];
  totalCount: number;
}

export function detectScheduleOverlaps(entries: ScheduleEntry[]): OverlapReport {
  const roomMap = new Map<string, ScheduleEntry[]>();
  const profMap = new Map<string, ScheduleEntry[]>();
  const groupMap = new Map<string, ScheduleEntry[]>();

  for (const entry of entries) {
    const rKey = `${entry.day}::${entry.blockCode}::${entry.classroomCode.trim()}`;
    const rList = roomMap.get(rKey) || [];
    rList.push(entry);
    roomMap.set(rKey, rList);

    const profNormalized = entry.professor.trim();
    if (
      profNormalized &&
      profNormalized.toLowerCase() !== 'propuesta' &&
      profNormalized.toLowerCase() !== 'sin asignar'
    ) {
      const pKey = `${entry.day}::${entry.blockCode}::${profNormalized}`;
      const pList = profMap.get(pKey) || [];
      pList.push(entry);
      profMap.set(pKey, pList);
    }

    const gKey = `${entry.day}::${entry.blockCode}::${entry.group.trim()}`;
    const gList = groupMap.get(gKey) || [];
    gList.push(entry);
    groupMap.set(gKey, gList);
  }

  const roomOverlaps: ScheduleOverlapItem[] = [];
  roomMap.forEach((list, key) => {
    if (list.length > 1) {
      const [day, blockCode, keyLabel] = key.split('::');
      roomOverlaps.push({
        kind: 'salon',
        day: day as DayOfWeek,
        blockCode,
        keyLabel,
        entries: list,
      });
    }
  });

  const professorOverlaps: ScheduleOverlapItem[] = [];
  profMap.forEach((list, key) => {
    if (list.length > 1) {
      const [day, blockCode, keyLabel] = key.split('::');
      professorOverlaps.push({
        kind: 'docente',
        day: day as DayOfWeek,
        blockCode,
        keyLabel,
        entries: list,
      });
    }
  });

  const groupOverlaps: ScheduleOverlapItem[] = [];
  groupMap.forEach((list, key) => {
    if (list.length > 1) {
      const [day, blockCode, keyLabel] = key.split('::');
      groupOverlaps.push({
        kind: 'grupo',
        day: day as DayOfWeek,
        blockCode,
        keyLabel,
        entries: list,
      });
    }
  });

  return {
    roomOverlaps,
    professorOverlaps,
    groupOverlaps,
    totalCount: roomOverlaps.length + professorOverlaps.length + groupOverlaps.length,
  };
}

export function exportSchedulesToCsv(entries: ScheduleEntry[]): void {
  const headers = ['ID', 'Grupo', 'Dia', 'Bloque', 'Salon', 'Materia', 'Docente'];
  const escapeCsv = (val: string) => `"${val.replace(/"/g, '""')}"`;
  const rows = entries.map((e) =>
    [e.id, e.group, e.day, e.blockCode, e.classroomCode, e.subjectName, e.professor]
      .map(escapeCsv)
      .join(',')
  );
  const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `horarios_turno_nocturno_unez_${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function exportSchedulesToJson(entries: ScheduleEntry[]): void {
  const payload = {
    institucion: 'Universidad Emiliano Zapata (UNEZ)',
    turno: 'Nocturno (N1-N6)',
    exportadoEn: new Date().toISOString(),
    totalRegistros: entries.length,
    totalGrupos: new Set(entries.map((e) => e.group)).size,
    horarios: entries,
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], {
    type: 'application/json;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bd_horarios_nocturno_unez_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
