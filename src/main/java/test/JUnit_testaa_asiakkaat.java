package test;

import static org.junit.jupiter.api.Assertions.*;
import java.util.ArrayList;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import model.Asiakas;
import model.dao.Dao;

@TestMethodOrder(OrderAnnotation.class)
class JUnit_testaa_asiakkaat {

	@Test
	@Order(1)	
	public void testPoistaKaikkiAsiakkaat() {
		Dao dao = new Dao();
		dao.removeAllItems("Nimda");
		ArrayList<Asiakas> asiakkaat = dao.getAllItems();
		assertEquals(0, asiakkaat.size());
	}
	
	@Test
	@Order(2)
	public void testLisaaAsiakkaat() {
		Dao dao = new Dao();
		Asiakas asiakas_1 = new Asiakas("Pekka", "Halonen", "050-73669746", "pekanposti@luukku.fi");
		Asiakas asiakas_2 = new Asiakas("Maija", "Heiskanen", "050-4756729", "maija@luukku.fi");
		Asiakas asiakas_3 = new Asiakas("Miina", "Mainio", "050-73698765", "mmainio@posti.fi");
		Asiakas asiakas_4 = new Asiakas("Inka", "Miettinen", "040-73669746", "iinka@postilaatikko.fi");
		assertEquals(true, dao.addItem(asiakas_1));
		assertEquals(true, dao.addItem(asiakas_2));
		assertEquals(true, dao.addItem(asiakas_3));
		assertEquals(true, dao.addItem(asiakas_4));
		assertEquals(4, dao.getAllItems().size());
	}
	
	@Test
	@Order(3)
	public void testMuutaAsiakas() {
		Dao dao = new Dao();
		ArrayList<Asiakas> asiakkaat = dao.getAllItems("Pekka");
		asiakkaat.get(0).setEtunimi("Petteri");
		dao.changeItem(asiakkaat.get(0));
		asiakkaat = dao.getAllItems("Petteri");
		assertEquals("Petteri", asiakkaat.get(0).getEtunimi());
		assertEquals("Halonen", asiakkaat.get(0).getSukunimi());
		assertEquals("050-73669746", asiakkaat.get(0).getPuhelin());
		assertEquals("pekanposti@luukku.fi", asiakkaat.get(0).getSposti());
	}
	
	@Test
	@Order(4)
	public void testPoistaAsiakas() {
		Dao dao = new Dao();
		ArrayList<Asiakas> asiakkaat = dao.getAllItems("Petteri");
		dao.removeItem(asiakkaat.get(0).getAsiakas_id());
		assertEquals(0, dao.getAllItems("Petteri").size());		
	}
	
	@Test
	@Order(5)
	public void testHaeOlematonAsiakas() {
		Dao dao = new Dao();
		assertNull(dao.getItem(-1));
	}
}
